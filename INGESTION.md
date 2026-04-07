# Moonwatch — Ingestion Architecture

## Overview

Moonwatch uses a layered ingestion pipeline to collect, normalize, and present
lunar exploration data from multiple sources. The architecture is designed so
that adding a new source requires only **one new file** and a registry entry.

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐     ┌──────────┐
│  Adapters    │────►│  Transform  │────►│  Data Access  │────►│   UI     │
│  (fetch)     │     │  (pipeline) │     │  (query)      │     │          │
└─────────────┘     └─────────────┘     └──────────────┘     └──────────┘
  nasa.ts             normalize.ts       data-access.ts       pages/
  esa.ts              deduplicate.ts                          components/
  jaxa.ts             enrich.ts
  manual.ts
```

## How Each Adapter Works

### Adapter Interface

Every adapter implements the `Adapter` interface (`src/adapters/types.ts`):

```typescript
interface Adapter {
  config: AdapterConfig;
  fetch(): Promise<FetchResult>;
  healthCheck(): Promise<boolean>;
}
```

Most adapters extend `BaseAdapter` (`src/adapters/base-adapter.ts`), which
handles error wrapping, item limiting, and health checks. Subclasses only
need to implement `fetchRaw(): Promise<RawItem[]>`.

### Registered Adapters

| Adapter | File | Status | Method |
|---------|------|--------|--------|
| **NASA RSS** | `adapters/nasa.ts` | Enabled | RSS feeds (Artemis Blog, Breaking News) |
| **ESA News** | `adapters/esa.ts` | Enabled | RSS feeds (Space Science, Human Exploration) |
| **JAXA News** | `adapters/jaxa.ts` | Enabled | RSS feed (press releases) |
| **ISRO Updates** | `adapters/isro.ts` | Disabled | Stub — needs HTML scraping |
| **CNSA Press** | `adapters/cnsa.ts` | Disabled | Stub — limited English feeds |
| **Commercial** | `adapters/commercial.ts` | Enabled | Multi-source RSS (IM, ispace, Astrobotic) |
| **Manual** | `adapters/manual.ts` | Enabled | Reads from `data/manual-entries.ts` |

### RSS Parser

The RSS parser (`src/adapters/rss-parser.ts`) is a lightweight, dependency-free
parser that handles RSS 2.0 and Atom feeds using regex-based XML extraction.
It processes CDATA sections, HTML entities, and malformed dates gracefully.

## How to Add a New Source

1. **Create an adapter file** in `src/adapters/`:

```typescript
import { BaseAdapter } from "./base-adapter";
import { fetchRssFeed } from "./rss-parser";
import type { AdapterConfig, RawItem } from "./types";

const MY_CONFIG: AdapterConfig = {
  id: "my-source",
  name: "My Source Name",
  sourceType: "official-agency",
  reliability: "primary",
  enabled: true,
  endpoints: ["https://example.com/rss"],
  pollIntervalMinutes: 120,
  maxItems: 20,
  defaultTags: ["my-tag"],
  defaultEntityIds: ["entity-id"],
};

export class MyAdapter extends BaseAdapter {
  constructor(config?: Partial<AdapterConfig>) {
    super({ ...MY_CONFIG, ...config });
  }

  async fetchRaw(): Promise<RawItem[]> {
    const allItems: RawItem[] = [];
    for (const endpoint of this.config.endpoints) {
      const items = await fetchRssFeed(endpoint, this.config.maxItems);
      allItems.push(...items);
    }
    return allItems.slice(0, this.config.maxItems);
  }
}
```

2. **Register it** in `src/adapters/index.ts`:

```typescript
import { MyAdapter } from "./my-source";

export const adapters: Record<string, Adapter> = {
  // ... existing adapters
  "my-source": new MyAdapter(),
};
```

3. **Add a Source record** in `src/data/sources.ts` so the UI can display
   provenance information.

That's it. The normalization pipeline handles the rest.

## How Normalization Works

The pipeline runs in three stages (`src/transform/`):

### 1. Normalize (`normalize.ts`)

Converts `RawItem` → `Update`:
- Generates deterministic IDs from `sourceId + externalId`
- Creates slugs from titles
- Extracts summaries from content if not provided
- Infers significance (routine/notable/major/critical) from keyword heuristics
- Applies adapter's default tags and entity associations
- Creates `SourceRef` entries for provenance

### 2. Deduplicate (`deduplicate.ts`)

Removes duplicates across sources:
- **Exact URL match** → definite duplicate
- **Title similarity > 70%** (Jaccard on words) + dates within 48h → likely duplicate
- Keeps the highest-priority source version (manual > NASA > ESA > commercial)
- Merges tags from all duplicate versions into the surviving entry

### 3. Enrich (`enrich.ts`)

Auto-links updates to known entities:
- Scans title, summary, and content for keyword matches
- Matches against known missions, entities, and infrastructure from `src/data/`
- Adds contextual tags (south-pole, crewed, launch, testing, etc.)
- Never removes manually set associations — only adds new ones

## Where Manual Curation Fits

Manual entries live in `src/data/manual-entries.ts` as `RawItem[]` objects.
They flow through the **exact same pipeline** as external sources:

```
manual-entries.ts → ManualAdapter → normalize → deduplicate → enrich → UI
```

This means manual entries get the same enrichment, deduplication, and source
tracking as automated entries. To add a manual entry:

1. Add an entry to `src/data/manual-entries.ts`
2. The `ManualAdapter` picks it up automatically
3. It flows through normalization and appears in the UI

Manual entries have **highest priority** in deduplication — they always win
over automated entries covering the same event.

## How to Avoid Duplication

The deduplication strategy uses three signals:

1. **URL identity** — same source URL = same item
2. **Title similarity** — Jaccard word overlap > 0.7 threshold
3. **Temporal proximity** — dates within 48 hours

Source priority ranking ensures the best version survives:

```
manual-curation: 100 (always wins)
nasa-rss:         90
esa-rss:          85
jaxa-rss:         85
isro-rss:         85
cnsa-rss:         80
commercial-rss:   70
```

## Caching Strategy

Currently, adapters fetch fresh data on each invocation. For production use:

- **Static regeneration**: Use Next.js ISR with `revalidate` on pages that
  show ingested data. This provides automatic caching at the page level.
- **Adapter-level caching**: Each `AdapterConfig` includes `pollIntervalMinutes`.
  A future scheduler can respect this interval to avoid over-fetching.
- **Source `lastFetched`**: The `Source` records in `data/sources.ts` track
  when each source was last fetched, enabling staleness detection.

## Fallback Behavior

When an adapter fails:

1. The `BaseAdapter.fetch()` wrapper catches errors and returns a `FetchResult`
   with `success: false` and the error message.
2. The ingestion orchestrator (`lib/ingestion.ts`) continues to the next adapter.
3. Failed fetches are recorded in `IngestionResult.errors`.
4. Existing curated data remains unaffected — failures never corrupt the base dataset.

## Integration with Data Access

The data-access layer (`src/lib/data-access.ts`) provides two modes:

- `getAllUpdates()` — returns only curated/mock data (stable, always available)
- `getAllUpdatesWithIngested()` — merges curated + ingested data at query time

Ingested updates are registered via `registerIngestedUpdates()` after a
pipeline run. This keeps the ingestion layer fully decoupled from the
static data — the UI works identically whether or not ingestion has run.

## File Reference

```
src/adapters/
├── types.ts          # Adapter, AdapterConfig, FetchResult, RawItem
├── base-adapter.ts   # Abstract base class with error handling
├── rss-parser.ts     # Dependency-free RSS/Atom parser
├── nasa.ts           # NASA RSS feeds
├── esa.ts            # ESA news feeds
├── jaxa.ts           # JAXA press releases
├── isro.ts           # ISRO (stub — needs scraping)
├── cnsa.ts           # CNSA (stub — limited English)
├── commercial.ts     # Multi-company commercial feeds
├── manual.ts         # Manual curation adapter
└── index.ts          # Adapter registry + helpers

src/transform/
├── normalize.ts      # RawItem → Update conversion
├── deduplicate.ts    # Cross-source dedup with priority ranking
├── enrich.ts         # Auto-link missions, entities, infrastructure
└── index.ts          # Barrel exports

src/lib/
├── ingestion.ts      # Orchestrator: runIngestion(), mergeWithExisting()
└── data-access.ts    # Query layer with ingested update support

src/data/
└── manual-entries.ts # Manually curated RawItem entries
```

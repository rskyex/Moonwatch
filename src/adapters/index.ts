// ---------------------------------------------------------------------------
// Moonwatch – adapter registry
// ---------------------------------------------------------------------------
// All adapters are registered here. The ingestion pipeline iterates this
// registry to fetch, normalize, and merge data from all sources.
//
// To add a new source:
// 1. Create a new adapter file in src/adapters/
// 2. Extend BaseAdapter and implement fetchRaw()
// 3. Register the adapter instance below
// 4. Add a corresponding Source entry in src/data/sources.ts
// ---------------------------------------------------------------------------

import type { Adapter, AdapterConfig, FetchResult, RawItem } from "./types";
import { NasaAdapter } from "./nasa";
import { EsaAdapter } from "./esa";
import { JaxaAdapter } from "./jaxa";
import { IsroAdapter } from "./isro";
import { CnsaAdapter } from "./cnsa";
import { CommercialAdapter } from "./commercial";
import { ManualAdapter } from "./manual";
import { manualEntries } from "@/data/manual-entries";

// Re-export types
export type { Adapter, AdapterConfig, FetchResult, RawItem };

// ---------------------------------------------------------------------------
// Adapter Registry
// ---------------------------------------------------------------------------

/** All registered adapters, keyed by their config.id */
export const adapters: Record<string, Adapter> = {
  "nasa-rss": new NasaAdapter(),
  "esa-rss": new EsaAdapter(),
  "jaxa-rss": new JaxaAdapter(),
  "isro-rss": new IsroAdapter(),
  "cnsa-rss": new CnsaAdapter(),
  "commercial-rss": new CommercialAdapter(),
  "manual-curation": new ManualAdapter(manualEntries),
};

/** Get all enabled adapters */
export function getEnabledAdapters(): Adapter[] {
  return Object.values(adapters).filter((a) => a.config.enabled);
}

/** Get adapter by ID */
export function getAdapter(id: string): Adapter | undefined {
  return adapters[id];
}

/** Fetch from all enabled adapters */
export async function fetchAllSources(): Promise<FetchResult[]> {
  const enabled = getEnabledAdapters();
  const results = await Promise.allSettled(
    enabled.map((adapter) => adapter.fetch()),
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<FetchResult> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value);
}

/** Health check all adapters */
export async function checkAllSources(): Promise<Record<string, boolean>> {
  const checks: Record<string, boolean> = {};
  for (const [id, adapter] of Object.entries(adapters)) {
    checks[id] = await adapter.healthCheck();
  }
  return checks;
}

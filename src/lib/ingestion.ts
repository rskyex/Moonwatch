import type { Update } from "@/types";
import type { FetchResult } from "@/adapters/types";
import { getEnabledAdapters, adapters } from "@/adapters";
import { normalizeBatch } from "@/transform/normalize";
import { deduplicateUpdates } from "@/transform/deduplicate";
import { enrichBatch } from "@/transform/enrich";

/** Result of a full ingestion run */
export interface IngestionResult {
  timestamp: string;
  fetchResults: FetchResult[];
  normalizedCount: number;
  deduplicatedCount: number;
  enrichedCount: number;
  finalUpdates: Update[];
  errors: string[];
}

/**
 * Run the full ingestion pipeline:
 * 1. Fetch from all enabled adapters
 * 2. Normalize raw items into internal Update shape
 * 3. Deduplicate across sources
 * 4. Enrich with entity/mission/infrastructure associations
 *
 * Returns the final list of Updates ready for storage/display.
 */
export async function runIngestion(): Promise<IngestionResult> {
  const timestamp = new Date().toISOString();
  const errors: string[] = [];

  // Step 1: Fetch from all enabled adapters
  const enabledAdapters = getEnabledAdapters();
  const fetchResults: FetchResult[] = [];

  for (const adapter of enabledAdapters) {
    try {
      const result = await adapter.fetch();
      fetchResults.push(result);
      if (!result.success && result.error) {
        errors.push(`[${adapter.config.id}] ${result.error}`);
      }
    } catch (err) {
      errors.push(`[${adapter.config.id}] Unexpected: ${err instanceof Error ? err.message : "unknown"}`);
    }
  }

  // Step 2: Normalize all raw items
  let allUpdates: Update[] = [];
  for (const result of fetchResults) {
    if (!result.success || result.items.length === 0) continue;
    const adapter = adapters[result.sourceId];
    if (!adapter) continue;
    const normalized = normalizeBatch(result.items, adapter.config);
    allUpdates.push(...normalized);
  }
  const normalizedCount = allUpdates.length;

  // Step 3: Deduplicate
  allUpdates = deduplicateUpdates(allUpdates);
  const deduplicatedCount = allUpdates.length;

  // Step 4: Enrich
  allUpdates = enrichBatch(allUpdates);
  const enrichedCount = allUpdates.length;

  // Sort by date descending
  allUpdates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    timestamp,
    fetchResults,
    normalizedCount,
    deduplicatedCount,
    enrichedCount,
    finalUpdates: allUpdates,
    errors,
  };
}

/**
 * Run ingestion for a single adapter by ID.
 * Useful for testing individual sources.
 */
export async function runSingleIngestion(adapterId: string): Promise<IngestionResult> {
  const timestamp = new Date().toISOString();
  const adapter = adapters[adapterId];

  if (!adapter) {
    return {
      timestamp,
      fetchResults: [],
      normalizedCount: 0,
      deduplicatedCount: 0,
      enrichedCount: 0,
      finalUpdates: [],
      errors: [`Adapter not found: ${adapterId}`],
    };
  }

  const result = await adapter.fetch();
  const errors = result.success ? [] : [result.error || "Unknown error"];

  let updates: Update[] = [];
  if (result.success && result.items.length > 0) {
    updates = normalizeBatch(result.items, adapter.config);
    updates = deduplicateUpdates(updates);
    updates = enrichBatch(updates);
    updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return {
    timestamp,
    fetchResults: [result],
    normalizedCount: updates.length,
    deduplicatedCount: updates.length,
    enrichedCount: updates.length,
    finalUpdates: updates,
    errors,
  };
}

/**
 * Merge ingested updates with existing curated updates.
 * Existing manual/curated entries take priority.
 * Ingested items are added if they don't duplicate existing ones.
 */
export function mergeWithExisting(
  existing: Update[],
  ingested: Update[],
): Update[] {
  // Mark all existing as the base
  const existingUrls = new Set(
    existing.flatMap(u => u.sources.map(s => s.url)).filter(Boolean)
  );
  const existingIds = new Set(existing.map(u => u.id));

  // Filter out ingested items that duplicate existing
  const newItems = ingested.filter(u => {
    if (existingIds.has(u.id)) return false;
    const itemUrl = u.sources[0]?.url;
    if (itemUrl && existingUrls.has(itemUrl)) return false;
    return true;
  });

  return [...existing, ...newItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

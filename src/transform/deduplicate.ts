import type { Update } from "@/types";

/**
 * Compute similarity between two strings (Jaccard similarity on word sets).
 */
function wordSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  const wordsB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection++;
  }
  return intersection / (wordsA.size + wordsB.size - intersection);
}

/**
 * Check if two dates are within a given window (in hours).
 */
function datesAreClose(dateA: string, dateB: string, windowHours = 48): boolean {
  const diff = Math.abs(new Date(dateA).getTime() - new Date(dateB).getTime());
  return diff < windowHours * 60 * 60 * 1000;
}

/**
 * Source priority for deduplication.
 * When duplicates are found, keep the one from the higher-priority source.
 */
const SOURCE_PRIORITY: Record<string, number> = {
  "manual-curation": 100, // Manual always wins
  "nasa-rss": 90,
  "esa-rss": 85,
  "jaxa-rss": 85,
  "isro-rss": 85,
  "cnsa-rss": 80,
  "commercial-rss": 70,
};

function getSourcePriority(sourceId: string): number {
  return SOURCE_PRIORITY[sourceId] ?? 50;
}

/**
 * Detect and remove duplicate updates across multiple sources.
 *
 * Strategy:
 * 1. Exact URL match → definite duplicate
 * 2. Title similarity > 0.7 AND dates within 48h → likely duplicate
 * 3. When duplicates found, keep the highest-priority source version
 * 4. Merge tags from duplicates into the surviving entry
 */
export function deduplicateUpdates(updates: Update[]): Update[] {
  if (updates.length <= 1) return updates;

  const surviving: Update[] = [];
  const consumed = new Set<number>();

  for (let i = 0; i < updates.length; i++) {
    if (consumed.has(i)) continue;

    let best = updates[i];
    const mergedTags = new Set(best.tags);

    for (let j = i + 1; j < updates.length; j++) {
      if (consumed.has(j)) continue;

      const candidate = updates[j];
      const isDuplicate =
        // Exact URL match
        (best.sources[0]?.url && candidate.sources[0]?.url &&
          best.sources[0].url === candidate.sources[0].url) ||
        // High title similarity + close dates
        (wordSimilarity(best.title, candidate.title) > 0.7 &&
          datesAreClose(best.date, candidate.date));

      if (isDuplicate) {
        consumed.add(j);
        // Merge tags
        for (const tag of candidate.tags) mergedTags.add(tag);
        // Keep higher priority source
        if (getSourcePriority(candidate.sourceId) > getSourcePriority(best.sourceId)) {
          best = candidate;
        }
      }
    }

    surviving.push({
      ...best,
      tags: Array.from(mergedTags),
    });
  }

  return surviving;
}

export { wordSimilarity, datesAreClose, getSourcePriority };

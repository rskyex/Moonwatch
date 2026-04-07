import type { Update } from "@/types";

/**
 * Auto-enrich updates: detect mission/entity references in text,
 * assign tags, link to infrastructure.
 * Future implementation: NLP or keyword matching against known entities.
 */
export function enrichUpdate(update: Update): Update {
  // TODO: Implement auto-tagging and entity linking
  return update;
}

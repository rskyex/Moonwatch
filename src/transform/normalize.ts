import type { RawItem } from "@/adapters/types";
import type { Update } from "@/types";

/**
 * Normalize raw adapter output into internal Update shape.
 * Future implementation: map external fields to internal schema,
 * auto-detect related missions/entities, assign significance.
 */
export function normalizeToUpdate(
  _raw: RawItem,
  _sourceId: string,
): Partial<Update> {
  // TODO: Implement when first adapter is connected
  return {};
}

// ---------------------------------------------------------------------------
// Moonwatch – Source & SourceRef types
// ---------------------------------------------------------------------------

import { ReliabilityTier, SourceType } from "./enums";

/** A reference to a specific source with access metadata. */
export interface SourceRef {
  sourceId: string;
  url: string;
  accessedAt: string; // ISO 8601
  quote?: string;
}

/** A citable information source tracked by the system. */
export interface Source {
  id: string;
  slug: string;
  name: string;
  type: SourceType;
  url?: string;
  reliability: ReliabilityTier;
  lastFetched?: string; // ISO 8601
  tags: string[];
  sources: SourceRef[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

// ---------------------------------------------------------------------------
// Moonwatch – Update type
// ---------------------------------------------------------------------------

import { Significance } from "./enums";
import { SourceRef } from "./source";

/** A curated news / status update related to lunar exploration. */
export interface Update {
  id: string;
  slug: string;
  name: string;
  title: string;
  summary: string;
  content?: string;
  date: string; // ISO 8601
  significance: Significance;
  missionIds: string[];
  entityIds: string[];
  infrastructureIds: string[];
  sourceId: string;
  curatedBy?: string;
  ingestedFrom?: string;
  tags: string[];
  sources: SourceRef[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601

  /** Editorial: why this development matters in context */
  whyItMatters?: string;
  /** Operational category for Activity grouping */
  operationalCategory?: string;
}

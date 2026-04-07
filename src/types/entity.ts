// ---------------------------------------------------------------------------
// Moonwatch – Entity (agency / company) type
// ---------------------------------------------------------------------------

import { EntityType } from "./enums";
import { SourceRef } from "./source";

/** An organisation involved in lunar exploration. */
export interface Entity {
  id: string;
  slug: string;
  name: string;
  type: EntityType;
  shortName?: string;
  country?: string;
  description: string;
  website?: string;
  missionIds: string[];
  tags: string[];
  sources: SourceRef[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

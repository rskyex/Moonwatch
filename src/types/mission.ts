// ---------------------------------------------------------------------------
// Moonwatch – Mission type
// ---------------------------------------------------------------------------

import { MissionStatus, MissionType } from "./enums";
import { SourceRef } from "./source";

/** A lunar mission tracked by the observatory. */
export interface Mission {
  id: string;
  slug: string;
  name: string;
  status: MissionStatus;
  type: MissionType;
  launchDate?: string; // ISO 8601
  landingDate?: string; // ISO 8601
  endDate?: string; // ISO 8601
  description: string;
  objectives: string[];
  entityIds: string[];
  infrastructureIds: string[];
  regionId?: string;
  tags: string[];
  sources: SourceRef[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

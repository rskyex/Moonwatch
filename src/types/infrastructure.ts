// ---------------------------------------------------------------------------
// Moonwatch – InfrastructureProject type
// ---------------------------------------------------------------------------

import { InfrastructureType, ProjectStatus } from "./enums";
import { SourceRef } from "./source";

/** A piece of lunar infrastructure (lander, rover, habitat, etc.). */
export interface InfrastructureProject {
  id: string;
  slug: string;
  name: string;
  type: InfrastructureType;
  status: ProjectStatus;
  description: string;
  entityIds: string[];
  missionIds: string[];
  regionId?: string;
  tags: string[];
  sources: SourceRef[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

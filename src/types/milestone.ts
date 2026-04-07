// ---------------------------------------------------------------------------
// Moonwatch – Milestone type
// ---------------------------------------------------------------------------

import { DateGranularity, MilestoneStatus, MilestoneType } from "./enums";
import { SourceRef } from "./source";

/** A significant event or target date in lunar exploration. */
export interface Milestone {
  id: string;
  slug: string;
  name: string;
  title: string;
  date: string; // ISO 8601
  dateGranularity: DateGranularity;
  type: MilestoneType;
  status: MilestoneStatus;
  missionIds: string[];
  entityIds: string[];
  description: string;
  tags: string[];
  sources: SourceRef[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601

  /** Editorial: what this milestone means for the broader program */
  whyItMatters?: string;
  /** Horizon: recent | upcoming | long-term */
  horizon?: string;
  /** Thematic grouping: artemis-program | chang-e-program | commercial-lunar | international-cooperation | infrastructure */
  thematicGroup?: string;
}

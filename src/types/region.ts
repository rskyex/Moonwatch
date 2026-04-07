// ---------------------------------------------------------------------------
// Moonwatch – LunarRegion type
// ---------------------------------------------------------------------------

import { SourceRef } from "./source";

/** Geographic coordinates on the lunar surface. */
export interface LunarCoordinates {
  lat: number;
  lng: number;
}

/** A named region on the Moon relevant to exploration activities. */
export interface LunarRegion {
  id: string;
  slug: string;
  name: string;
  coordinates?: LunarCoordinates;
  description: string;
  missionIds: string[];
  significance: string;
  tags: string[];
  sources: SourceRef[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601

  /** Scientific interest: what makes this region valuable for research */
  scientificInterest?: string;
  /** Strategic interest: resource potential, base siting, etc. */
  strategicInterest?: string;
  /** Known or theorized resources */
  resources?: string[];
  /** Terrain characteristics */
  terrain?: string;
}

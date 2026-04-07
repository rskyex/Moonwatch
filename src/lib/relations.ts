// ---------------------------------------------------------------------------
// Moonwatch – cross-entity relationship helpers
// ---------------------------------------------------------------------------
// Resolve IDs to full objects by composing data-access functions.
// ---------------------------------------------------------------------------

import type {
  Entity,
  InfrastructureProject,
  LunarRegion,
  Milestone,
  Mission,
  Source,
  Update,
} from "@/types";

import {
  getAllEntities,
  getAllInfrastructure,
  getAllMilestones,
  getAllMissions,
  getAllRegions,
  getMissionsByEntity,
  getMissionsByRegion,
  getSourceById,
  getUpdatesByMission,
} from "@/lib/data-access";

// ---------------------------------------------------------------------------
// Mission → related objects
// ---------------------------------------------------------------------------

/** Resolve a mission's entityIds to full Entity objects. */
export function getMissionEntities(mission: Mission): Entity[] {
  const allEntities = getAllEntities();
  return mission.entityIds
    .map((id) => allEntities.find((e) => e.id === id))
    .filter((e): e is Entity => e != null);
}

/** Resolve a mission's regionId to a LunarRegion (if set). */
export function getMissionRegion(mission: Mission): LunarRegion | undefined {
  if (!mission.regionId) return undefined;
  const allRegions = getAllRegions();
  return allRegions.find((r) => r.id === mission.regionId);
}

/** Resolve a mission's infrastructureIds to full InfrastructureProject objects. */
export function getMissionInfrastructure(
  mission: Mission,
): InfrastructureProject[] {
  const allInfra = getAllInfrastructure();
  return mission.infrastructureIds
    .map((id) => allInfra.find((i) => i.id === id))
    .filter((i): i is InfrastructureProject => i != null);
}

/** Get all milestones referencing a given mission. */
export function getMissionMilestones(missionId: string): Milestone[] {
  return getAllMilestones().filter((m) => m.missionIds.includes(missionId));
}

/** Get all updates referencing a given mission. */
export function getMissionUpdates(missionId: string): Update[] {
  return getUpdatesByMission(missionId);
}

// ---------------------------------------------------------------------------
// Entity → related objects
// ---------------------------------------------------------------------------

/** Get all missions an entity participates in. */
export function getEntityMissions(entityId: string): Mission[] {
  return getMissionsByEntity(entityId);
}

/** Get all infrastructure projects an entity is involved in. */
export function getEntityInfrastructure(
  entityId: string,
): InfrastructureProject[] {
  return getAllInfrastructure().filter((i) => i.entityIds.includes(entityId));
}

// ---------------------------------------------------------------------------
// Infrastructure → related objects
// ---------------------------------------------------------------------------

/** Resolve an infrastructure project's entityIds to Entity objects. */
export function getInfrastructureEntities(
  infra: InfrastructureProject,
): Entity[] {
  const allEntities = getAllEntities();
  return infra.entityIds
    .map((id) => allEntities.find((e) => e.id === id))
    .filter((e): e is Entity => e != null);
}

/** Resolve an infrastructure project's missionIds to Mission objects. */
export function getInfrastructureMissions(
  infra: InfrastructureProject,
): Mission[] {
  const allMissions = getAllMissions();
  return infra.missionIds
    .map((id) => allMissions.find((m) => m.id === id))
    .filter((m): m is Mission => m != null);
}

// ---------------------------------------------------------------------------
// Update → related objects
// ---------------------------------------------------------------------------

/** Resolve an update's sourceId to a Source object. */
export function getUpdateSource(update: Update): Source | undefined {
  return getSourceById(update.sourceId);
}

// ---------------------------------------------------------------------------
// Region → related objects
// ---------------------------------------------------------------------------

/** Get all missions targeting a given region. */
export function getRegionMissions(regionId: string): Mission[] {
  return getMissionsByRegion(regionId);
}


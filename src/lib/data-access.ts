// ---------------------------------------------------------------------------
// Moonwatch – single data-access layer
// ---------------------------------------------------------------------------
// Components import from here, never from @/data/* directly.
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
import { MilestoneStatus, MissionStatus, MissionType } from "@/types";

import { sources } from "@/data/sources";
import { missions } from "@/data/missions";
import { entities } from "@/data/entities";
import { updates } from "@/data/updates";
import { infrastructure } from "@/data/infrastructure";
import { milestones } from "@/data/milestones";
import { regions } from "@/data/regions";

// ---------------------------------------------------------------------------
// Missions
// ---------------------------------------------------------------------------

export function getAllMissions(): Mission[] {
  return missions;
}

export function getMissionBySlug(slug: string): Mission | undefined {
  return missions.find((m) => m.slug === slug);
}

export function getMissionsByEntity(entityId: string): Mission[] {
  return missions.filter((m) => m.entityIds.includes(entityId));
}

export function getMissionsByRegion(regionId: string): Mission[] {
  return missions.filter((m) => m.regionId === regionId);
}

export function getMissionsByStatus(status: MissionStatus): Mission[] {
  return missions.filter((m) => m.status === status);
}

export function getMissionsByType(type: MissionType): Mission[] {
  return missions.filter((m) => m.type === type);
}

/**
 * Return "featured" missions: active ones first (launched, in-transit,
 * in-orbit, on-surface), then planned, limited to `count`.
 */
export function getFeaturedMissions(count?: number): Mission[] {
  const activeStatuses = new Set<MissionStatus>([
    MissionStatus.Launched,
    MissionStatus.InTransit,
    MissionStatus.InOrbit,
    MissionStatus.OnSurface,
  ]);

  const sorted = [...missions].sort((a, b) => {
    const aActive = activeStatuses.has(a.status) ? 0 : 1;
    const bActive = activeStatuses.has(b.status) ? 0 : 1;
    if (aActive !== bActive) return aActive - bActive;
    // Secondary sort: planned before completed/failed
    const aPlanned = a.status === MissionStatus.Planned ? 0 : 1;
    const bPlanned = b.status === MissionStatus.Planned ? 0 : 1;
    return aPlanned - bPlanned;
  });

  return count != null ? sorted.slice(0, count) : sorted;
}

export function getActiveMissionCount(): number {
  const active = new Set<MissionStatus>([
    MissionStatus.Launched,
    MissionStatus.InTransit,
    MissionStatus.InOrbit,
    MissionStatus.OnSurface,
  ]);
  return missions.filter((m) => active.has(m.status)).length;
}

export function searchMissions(query: {
  status?: MissionStatus;
  type?: MissionType;
  entityId?: string;
  regionId?: string;
}): Mission[] {
  return missions.filter((m) => {
    if (query.status && m.status !== query.status) return false;
    if (query.type && m.type !== query.type) return false;
    if (query.entityId && !m.entityIds.includes(query.entityId)) return false;
    if (query.regionId && m.regionId !== query.regionId) return false;
    return true;
  });
}

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------

export function getAllEntities(): Entity[] {
  return entities;
}

export function getEntityBySlug(slug: string): Entity | undefined {
  return entities.find((e) => e.slug === slug);
}

// ---------------------------------------------------------------------------
// Updates
// ---------------------------------------------------------------------------

export function getAllUpdates(): Update[] {
  return [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getUpdatesByMission(missionId: string): Update[] {
  return getAllUpdates().filter((u) => u.missionIds.includes(missionId));
}

export function getUpdatesByEntity(entityId: string): Update[] {
  return getAllUpdates().filter((u) => u.entityIds.includes(entityId));
}

export function getRecentUpdates(count: number): Update[] {
  return getAllUpdates().slice(0, count);
}

// ---------------------------------------------------------------------------
// Infrastructure
// ---------------------------------------------------------------------------

export function getAllInfrastructure(): InfrastructureProject[] {
  return infrastructure;
}

export function getInfrastructureBySlug(
  slug: string,
): InfrastructureProject | undefined {
  return infrastructure.find((i) => i.slug === slug);
}

// ---------------------------------------------------------------------------
// Milestones
// ---------------------------------------------------------------------------

export function getAllMilestones(): Milestone[] {
  return milestones;
}

export function getUpcomingMilestones(count?: number): Milestone[] {
  const upcoming = milestones
    .filter(
      (m) =>
        m.status === MilestoneStatus.Upcoming ||
        m.status === MilestoneStatus.Delayed,
    )
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  return count != null ? upcoming.slice(0, count) : upcoming;
}

export function getAchievedMilestones(): Milestone[] {
  return milestones
    .filter((m) => m.status === MilestoneStatus.Achieved)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

// ---------------------------------------------------------------------------
// Regions
// ---------------------------------------------------------------------------

export function getAllRegions(): LunarRegion[] {
  return regions;
}

export function getRegionBySlug(slug: string): LunarRegion | undefined {
  return regions.find((r) => r.slug === slug);
}

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------

export function getAllSources(): Source[] {
  return sources;
}

export function getSourceById(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

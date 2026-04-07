import type { Mission, Entity, InfrastructureProject, LunarRegion, Update, Milestone } from "@/types";
import {
  getAllMissions, getAllEntities, getAllInfrastructure, getAllRegions,
  getAllMilestones, getAllUpdates, getMissionsByEntity, getMissionsByRegion,
  getUpcomingMilestones, getActiveMissionCount,
} from "@/lib/data-access";

// ---------------------------------------------------------------------------
// Related Content — find related items across entity boundaries
// ---------------------------------------------------------------------------

/** Find missions related to a given mission (shared entities, region, or program) */
export function getRelatedMissions(mission: Mission, limit = 5): Mission[] {
  const all = getAllMissions().filter(m => m.id !== mission.id);
  const scored = all.map(m => {
    let score = 0;
    // Shared entities
    const sharedEntities = m.entityIds.filter(id => mission.entityIds.includes(id));
    score += sharedEntities.length * 3;
    // Same region
    if (m.regionId && m.regionId === mission.regionId) score += 4;
    // Same program
    if (m.program && m.program === mission.program) score += 5;
    // Shared infrastructure
    const sharedInfra = m.infrastructureIds.filter(id => mission.infrastructureIds.includes(id));
    score += sharedInfra.length * 2;
    // Same type
    if (m.type === mission.type) score += 1;
    // Shared tags
    const sharedTags = m.tags.filter(t => mission.tags.includes(t));
    score += sharedTags.length;
    return { mission: m, score };
  });
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.mission);
}

/** Find infrastructure related to a given project (shared entities, missions, category) */
export function getRelatedInfrastructure(project: InfrastructureProject, limit = 5): InfrastructureProject[] {
  const all = getAllInfrastructure().filter(i => i.id !== project.id);
  const scored = all.map(i => {
    let score = 0;
    const sharedEntities = i.entityIds.filter(id => project.entityIds.includes(id));
    score += sharedEntities.length * 2;
    const sharedMissions = i.missionIds.filter(id => project.missionIds.includes(id));
    score += sharedMissions.length * 3;
    if (i.category && i.category === project.category) score += 4;
    if (i.type === project.type) score += 2;
    return { project: i, score };
  });
  return scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map(s => s.project);
}

/** Find entities that share missions with a given entity */
export function getEntityPartners(entityId: string): Entity[] {
  const entityMissions = getMissionsByEntity(entityId);
  const partnerIds = new Set<string>();
  for (const m of entityMissions) {
    for (const eid of m.entityIds) {
      if (eid !== entityId) partnerIds.add(eid);
    }
  }
  const allEntities = getAllEntities();
  return Array.from(partnerIds)
    .map(id => allEntities.find(e => e.id === id))
    .filter((e): e is Entity => e != null);
}

/** Find infrastructure in a given region */
export function getRegionInfrastructure(regionId: string): InfrastructureProject[] {
  return getAllInfrastructure().filter(i => i.regionId === regionId);
}

/** Find updates relevant to a region (via missions in that region) */
export function getRegionUpdates(regionId: string, limit = 5): Update[] {
  const regionMissions = getMissionsByRegion(regionId);
  const missionIds = new Set(regionMissions.map(m => m.id));
  return getAllUpdates()
    .filter(u => u.missionIds.some(id => missionIds.has(id)))
    .slice(0, limit);
}

/** Find milestones relevant to a region */
export function getRegionMilestones(regionId: string): Milestone[] {
  const regionMissions = getMissionsByRegion(regionId);
  const missionIds = new Set(regionMissions.map(m => m.id));
  return getAllMilestones().filter(m => m.missionIds.some(id => missionIds.has(id)));
}

// ---------------------------------------------------------------------------
// Overview Analytics — compute aggregate insights
// ---------------------------------------------------------------------------

export interface MissionsByStatusGroup {
  label: string;
  status: string;
  count: number;
  missions: Mission[];
}

/** Group missions by status for overview display */
export function getMissionsByStatusGroups(): MissionsByStatusGroup[] {
  const all = getAllMissions();
  const groups: Record<string, Mission[]> = {};
  for (const m of all) {
    if (!groups[m.status]) groups[m.status] = [];
    groups[m.status].push(m);
  }
  const labels: Record<string, string> = {
    "planned": "Planned", "in-development": "In Development", "launched": "Launched",
    "in-transit": "In Transit", "in-orbit": "In Orbit", "on-surface": "On Surface",
    "completed": "Completed", "failed": "Failed", "lost": "Lost",
  };
  const order = ["on-surface", "in-orbit", "in-transit", "launched", "in-development", "planned", "completed", "failed", "lost"];
  return order
    .filter(s => groups[s]?.length)
    .map(s => ({ label: labels[s] || s, status: s, count: groups[s].length, missions: groups[s] }));
}

export interface InfrastructureByLayer {
  category: string;
  label: string;
  count: number;
  items: InfrastructureProject[];
}

/** Group infrastructure by functional category */
export function getInfrastructureByLayers(): InfrastructureByLayer[] {
  const all = getAllInfrastructure();
  const groups: Record<string, InfrastructureProject[]> = {};
  for (const i of all) {
    const cat = i.category || "general";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(i);
  }
  const labels: Record<string, string> = {
    "landing-systems": "Landing Systems", "orbital": "Orbital", "logistics": "Logistics & Transport",
    "mobility": "Surface Mobility", "communications": "Communications", "navigation": "Navigation",
    "habitation": "Habitation", "power": "Power Systems", "isru": "ISRU", "general": "General",
  };
  return Object.entries(groups)
    .map(([cat, items]) => ({ category: cat, label: labels[cat] || cat, count: items.length, items }))
    .sort((a, b) => b.count - a.count);
}

export interface ActorProfile {
  entity: Entity;
  missionCount: number;
  infraCount: number;
  partnerCount: number;
  programs: string[];
}

/** Build actor ecosystem overview */
export function getActorEcosystem(): ActorProfile[] {
  const allEntities = getAllEntities();
  const allMissions = getAllMissions();
  const allInfra = getAllInfrastructure();

  return allEntities.map(entity => {
    const entityMissions = allMissions.filter(m => m.entityIds.includes(entity.id));
    const entityInfra = allInfra.filter(i => i.entityIds.includes(entity.id));
    const partnerIds = new Set<string>();
    for (const m of entityMissions) {
      for (const eid of m.entityIds) {
        if (eid !== entity.id) partnerIds.add(eid);
      }
    }
    const programs = [...new Set(entityMissions.map(m => m.program).filter((p): p is string => !!p))];
    return {
      entity,
      missionCount: entityMissions.length,
      infraCount: entityInfra.length,
      partnerCount: partnerIds.size,
      programs,
    };
  }).sort((a, b) => b.missionCount - a.missionCount);
}

export interface RegionActivity {
  region: LunarRegion;
  missionCount: number;
  activeMissions: Mission[];
  upcomingMissions: Mission[];
}

/** Region activity overview */
export function getRegionActivityOverview(): RegionActivity[] {
  const allRegions = getAllRegions();
  const allMissions = getAllMissions();
  const active = new Set(["launched", "in-transit", "in-orbit", "on-surface"]);
  const upcoming = new Set(["planned", "in-development"]);

  return allRegions.map(region => {
    const regionMissions = allMissions.filter(m => m.regionId === region.id);
    return {
      region,
      missionCount: regionMissions.length,
      activeMissions: regionMissions.filter(m => active.has(m.status)),
      upcomingMissions: regionMissions.filter(m => upcoming.has(m.status)),
    };
  }).filter(r => r.missionCount > 0).sort((a, b) => b.missionCount - a.missionCount);
}

/** Get missions in the next N months */
export function getMissionsInTimeWindow(months = 12): Mission[] {
  const now = new Date();
  const cutoff = new Date(now.getTime() + months * 30 * 24 * 60 * 60 * 1000);
  return getAllMissions().filter(m => {
    if (!m.launchDate) return false;
    const launch = new Date(m.launchDate);
    return launch >= now && launch <= cutoff;
  });
}

/** Find missions that depend on a given infrastructure */
export function getMissionsDependingOnInfra(infraId: string): Mission[] {
  return getAllMissions().filter(m => m.infrastructureIds.includes(infraId));
}

/** Find which entities work across multiple infrastructure categories */
export function getCrossdomainEntities(): { entity: Entity; categories: string[] }[] {
  const allEntities = getAllEntities();
  const allInfra = getAllInfrastructure();
  return allEntities.map(e => {
    const infra = allInfra.filter(i => i.entityIds.includes(e.id));
    const categories = [...new Set(infra.map(i => i.category).filter((c): c is string => !!c))];
    return { entity: e, categories };
  }).filter(e => e.categories.length >= 2).sort((a, b) => b.categories.length - a.categories.length);
}

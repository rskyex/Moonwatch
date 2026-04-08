import type { Metadata } from "next";

import HeroSection from "@/components/overview/HeroSection";
import SectionHeading from "@/components/shared/SectionHeading";
import UpdateCard from "@/components/activity/UpdateCard";
import MilestoneCard from "@/components/timeline/MilestoneCard";
import MissionStatusOverview from "@/components/overview/MissionStatusOverview";
import EcosystemOverview from "@/components/overview/EcosystemOverview";
import InfrastructureLayers from "@/components/overview/InfrastructureLayers";
import RegionActivityMap from "@/components/overview/RegionActivityMap";
import LunarMap from "@/components/regions/LunarMap";

import {
  getActiveMissionCount,
  getAllMissions,
  getAllEntities,
  getAllSources,
  getUpcomingMilestones,
  getSourceById,
  getAllInfrastructure,
  getAllRegions,
} from "@/lib/data-access";

import { getMissionsByRegion } from "@/lib/data-access";

import {
  getMissionsByStatusGroups,
  getInfrastructureByLayers,
  getActorEcosystem,
  getRegionActivityOverview,
} from "@/lib/intelligence";

import { MAJOR_LUNAR_FEATURES } from "@/adapters/usgs-moon";
import { getLiveUpdates, getLunarStateDisplay } from "@/lib/live-data";

export const metadata: Metadata = {
  title: "Moonwatch — Lunar Exploration Observatory",
};

export const revalidate = 3600;

function buildNameMap(items: { id: string; name: string; shortName?: string }[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const item of items) {
    map.set(item.id, ("shortName" in item && item.shortName) ? item.shortName as string : item.name);
  }
  return map;
}

function resolveNames(ids: string[], nameMap: Map<string, string>): string[] {
  return ids.map((id) => nameMap.get(id)).filter((n): n is string => n != null);
}

export default async function HomePage() {
  const allMissions = getAllMissions();
  const allEntities = getAllEntities();
  const allRegions = getAllRegions();

  const missionNameMap = buildNameMap(allMissions);
  const entityNameMap = buildNameMap(allEntities);

  const liveUpdates = await getLiveUpdates();
  const recentUpdates = liveUpdates.slice(0, 3);
  const upcomingMilestones = getUpcomingMilestones(4);

  const missionStatusGroups = getMissionsByStatusGroups();
  const actors = getActorEcosystem();
  const infrastructureLayers = getInfrastructureByLayers();
  const regions = getRegionActivityOverview();

  const lunarState = getLunarStateDisplay();
  const activeMissions = getActiveMissionCount();

  // Prepare map data
  const regionMarkers = allRegions.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    coordinates: r.coordinates,
    missionCount: getMissionsByRegion(r.id).length,
  }));
  const featureMarkers = MAJOR_LUNAR_FEATURES.slice(0, 25).map((f) => ({
    id: f.id,
    name: f.name,
    featureType: f.featureType,
    coordinates: f.coordinates,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Hero: Lunar telemetry as the opening statement ── */}
      <HeroSection
        lunarState={lunarState}
        activeMissions={activeMissions}
        totalMissions={allMissions.length}
      />

      {/* ── Lunar Surface Map — full width, right after hero ── */}
      <section className="mb-28 sm:mb-36 -mx-4 sm:mx-0">
        <div className="px-4 sm:px-0 mb-4">
          <SectionHeading title="Lunar Surface" viewAllHref="/regions" />
        </div>
        <LunarMap regions={regionMarkers} features={featureMarkers} />
      </section>

      {/* ── Mission Register ── */}
      <section className="mb-28 sm:mb-36">
        <SectionHeading title="Mission Register" viewAllHref="/missions" />
        <div className="mt-8">
          <MissionStatusOverview groups={missionStatusGroups} />
        </div>
      </section>

      {/* ── Dispatches ── */}
      <section className="mb-28 sm:mb-36">
        <SectionHeading title="Dispatches" viewAllHref="/activity" />
        <div className="mt-8 max-w-2xl">
          {recentUpdates.map((update) => {
            const source = getSourceById(update.sourceId);
            return (
              <UpdateCard
                key={update.id}
                update={update}
                sourceName={source?.name}
                missionNames={resolveNames(update.missionIds, missionNameMap)}
                entityNames={resolveNames(update.entityIds, entityNameMap)}
              />
            );
          })}
        </div>
      </section>

      {/* ── Infrastructure ── */}
      <section className="mb-28 sm:mb-36">
        <SectionHeading title="Infrastructure" viewAllHref="/infrastructure" />
        <div className="mt-8">
          <InfrastructureLayers layers={infrastructureLayers} />
        </div>
      </section>

      {/* ── Entities + Regions ── */}
      <section className="mb-28 sm:mb-36 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <SectionHeading title="Entities" viewAllHref="/entities" />
          <div className="mt-8">
            <EcosystemOverview actors={actors} />
          </div>
        </div>
        <div>
          <SectionHeading title="Region Activity" viewAllHref="/regions" />
          <div className="mt-8">
            <RegionActivityMap regions={regions} />
          </div>
        </div>
      </section>

      {/* ── Horizon ── */}
      <section className="mb-28 sm:mb-36">
        <SectionHeading title="Horizon" viewAllHref="/timeline" />
        <div className="mt-8 max-w-2xl">
          {upcomingMilestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              missionNames={resolveNames(milestone.missionIds, missionNameMap)}
              entityNames={resolveNames(milestone.entityIds, entityNameMap)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

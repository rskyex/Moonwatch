import type { Metadata } from "next";
import type { Entity, Mission } from "@/types";

import HeroSection from "@/components/overview/HeroSection";
import StatsBar from "@/components/overview/StatsBar";
import SectionHeading from "@/components/shared/SectionHeading";
import UpdateCard from "@/components/activity/UpdateCard";
import MilestoneCard from "@/components/timeline/MilestoneCard";
import MissionStatusOverview from "@/components/overview/MissionStatusOverview";
import EcosystemOverview from "@/components/overview/EcosystemOverview";
import InfrastructureLayers from "@/components/overview/InfrastructureLayers";
import RegionActivityMap from "@/components/overview/RegionActivityMap";

import {
  getActiveMissionCount,
  getAllMissions,
  getAllEntities,
  getAllSources,
  getRecentUpdates,
  getUpcomingMilestones,
  getSourceById,
  getAllInfrastructure,
} from "@/lib/data-access";

import {
  getMissionsByStatusGroups,
  getInfrastructureByLayers,
  getActorEcosystem,
  getRegionActivityOverview,
} from "@/lib/intelligence";

export const metadata: Metadata = {
  title: "Moonwatch — Lunar Exploration Observatory",
};

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

export default function HomePage() {
  const allMissions = getAllMissions();
  const allEntities = getAllEntities();
  const allSources = getAllSources();

  const missionNameMap = buildNameMap(allMissions);
  const entityNameMap = buildNameMap(allEntities);

  const recentUpdates = getRecentUpdates(3);
  const upcomingMilestones = getUpcomingMilestones(4);

  const missionStatusGroups = getMissionsByStatusGroups();
  const actors = getActorEcosystem();
  const infrastructureLayers = getInfrastructureByLayers();
  const regions = getRegionActivityOverview();

  const stats = [
    { label: "active missions", value: getActiveMissionCount() },
    { label: "missions tracked", value: allMissions.length },
    { label: "entities", value: allEntities.length },
    { label: "infrastructure systems", value: getAllInfrastructure().length },
    { label: "sources", value: allSources.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats: quiet inline context ── */}
      <section className="mb-20">
        <StatsBar stats={stats} />
      </section>

      {/* ── Missions: editorial text list ── */}
      <section className="mb-24">
        <SectionHeading title="Missions" viewAllHref="/missions" />
        <div className="mt-6">
          <MissionStatusOverview groups={missionStatusGroups} />
        </div>
      </section>

      {/* ── Activity: recent dispatches ── */}
      <section className="mb-24">
        <SectionHeading title="Recent Activity" viewAllHref="/activity" />
        <div className="mt-5 max-w-3xl">
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

      {/* ── Infrastructure: horizontal layers ── */}
      <section className="mb-24">
        <SectionHeading title="Infrastructure" viewAllHref="/infrastructure" />
        <div className="mt-6">
          <InfrastructureLayers layers={infrastructureLayers} />
        </div>
      </section>

      {/* ── Actors + Regions: two-column editorial ── */}
      <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading title="Entities" viewAllHref="/entities" />
          <div className="mt-6">
            <EcosystemOverview actors={actors} />
          </div>
        </div>
        <div>
          <SectionHeading title="Lunar Regions" viewAllHref="/regions" />
          <div className="mt-6">
            <RegionActivityMap regions={regions} />
          </div>
        </div>
      </section>

      {/* ── Timeline: upcoming milestones ── */}
      <section className="mb-20">
        <SectionHeading title="Upcoming Milestones" viewAllHref="/timeline" />
        <div className="mt-6 max-w-3xl">
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

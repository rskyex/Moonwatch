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
} from "@/lib/data-access";

import {
  getMissionsByStatusGroups,
  getInfrastructureByLayers,
  getActorEcosystem,
  getRegionActivityOverview,
} from "@/lib/intelligence";

export const metadata: Metadata = {
  title: "Moonwatch",
};

// ---------------------------------------------------------------------------
// Helpers – resolve IDs to display names
// ---------------------------------------------------------------------------

function buildMissionNameMap(missions: Mission[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of missions) {
    map.set(m.id, m.name);
  }
  return map;
}

function buildEntityNameMap(entities: Entity[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const e of entities) {
    map.set(e.id, e.shortName ?? e.name);
  }
  return map;
}

function resolveNames(
  ids: string[],
  nameMap: Map<string, string>,
): string[] {
  return ids
    .map((id) => nameMap.get(id))
    .filter((n): n is string => n != null);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  const allMissions = getAllMissions();
  const allEntities = getAllEntities();
  const allSources = getAllSources();

  const missionNameMap = buildMissionNameMap(allMissions);
  const entityNameMap = buildEntityNameMap(allEntities);

  const activeMissionCount = getActiveMissionCount();
  const upcomingMilestones = getUpcomingMilestones();
  const recentUpdates = getRecentUpdates(4);
  const displayedMilestones = upcomingMilestones.slice(0, 5);

  const missionStatusGroups = getMissionsByStatusGroups();
  const actors = getActorEcosystem();
  const infrastructureLayers = getInfrastructureByLayers();
  const regions = getRegionActivityOverview();

  const stats = [
    { label: "Active Missions", value: activeMissionCount },
    { label: "Total Missions", value: allMissions.length },
    { label: "Tracked Entities", value: allEntities.length },
    { label: "Upcoming Milestones", value: upcomingMilestones.length },
    { label: "Tracked Sources", value: allSources.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection />

      {/* Stats */}
      <section className="mb-14">
        <StatsBar stats={stats} />
      </section>

      {/* Mission Status Overview */}
      <section className="mb-14">
        <SectionHeading title="Mission Status" />
        <div className="mt-4">
          <MissionStatusOverview groups={missionStatusGroups} />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-14">
        <SectionHeading title="Recent Activity" viewAllHref="/activity" />
        <div className="mt-4 flex flex-col gap-4">
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

      {/* Actor Ecosystem */}
      <section className="mb-14">
        <SectionHeading title="Actor Ecosystem" viewAllHref="/entities" />
        <div className="mt-4">
          <EcosystemOverview actors={actors} />
        </div>
      </section>

      {/* Infrastructure Layers */}
      <section className="mb-14">
        <SectionHeading title="Infrastructure by Layer" viewAllHref="/infrastructure" />
        <div className="mt-4">
          <InfrastructureLayers layers={infrastructureLayers} />
        </div>
      </section>

      {/* Region Activity */}
      <section className="mb-14">
        <SectionHeading title="Lunar Regions" viewAllHref="/regions" />
        <div className="mt-4">
          <RegionActivityMap regions={regions} />
        </div>
      </section>

      {/* Upcoming Milestones */}
      <section className="mb-14">
        <SectionHeading title="Upcoming Milestones" viewAllHref="/timeline" />
        <div className="mt-4">
          {displayedMilestones.map((milestone) => (
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

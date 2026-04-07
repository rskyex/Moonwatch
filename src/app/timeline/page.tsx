import type { Metadata } from "next";
import { getAllMilestones, getAllMissions, getAllEntities } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";
import TimelineView from "@/components/timeline/TimelineView";

export const metadata: Metadata = {
  title: "Timeline — Moonwatch",
};

export default function TimelinePage() {
  const milestones = getAllMilestones();
  const missions = getAllMissions();
  const entities = getAllEntities();

  const missionNames: Record<string, string> = {};
  for (const m of missions) {
    missionNames[m.id] = m.name;
  }

  const entityNames: Record<string, string> = {};
  for (const e of entities) {
    entityNames[e.id] = e.shortName ?? e.name;
  }

  return (
    <>
      <PageHeader
        title="Timeline"
        description="Key milestones in the return to the Moon — achieved and upcoming."
      />
      <TimelineView
        milestones={milestones}
        missionNames={missionNames}
        entityNames={entityNames}
      />
    </>
  );
}

import type { Metadata } from "next";
import { getAllMilestones, getAllMissions, getAllEntities } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";
import TimelinePageClient from "./TimelinePageClient";

export const metadata: Metadata = {
  title: "Timeline — Moonwatch",
};

export default function TimelinePage() {
  const milestones = getAllMilestones();
  const missions = getAllMissions();
  const entities = getAllEntities();

  const missionNames: Record<string, string> = {};
  for (const m of missions) missionNames[m.id] = m.name;

  const entityNames: Record<string, string> = {};
  for (const e of entities) entityNames[e.id] = e.shortName ?? e.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Timeline"
        description="Key milestones in humanity's return to the Moon — achieved, imminent, and on the horizon."
      />
      <TimelinePageClient
        milestones={milestones}
        missionNames={missionNames}
        entityNames={entityNames}
      />
    </div>
  );
}

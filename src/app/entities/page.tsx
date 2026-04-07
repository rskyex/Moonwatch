import type { Metadata } from "next";
import { getAllEntities } from "@/lib/data-access";
import { getEntityMissions } from "@/lib/relations";
import { PageHeader } from "@/components/layout";
import EntitiesPageClient from "./EntitiesPageClient";

export const metadata: Metadata = {
  title: "Entities — Moonwatch",
};

export default function EntitiesPage() {
  const entities = getAllEntities();

  const missionCounts: Record<string, number> = {};
  for (const entity of entities) {
    missionCounts[entity.id] = getEntityMissions(entity.id).length;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Entities"
        description="Agencies, companies, and institutions shaping lunar exploration."
      />
      <EntitiesPageClient entities={entities} missionCounts={missionCounts} />
    </div>
  );
}

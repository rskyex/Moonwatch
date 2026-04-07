import type { Metadata } from "next";
import { getAllEntities } from "@/lib/data-access";
import { getEntityMissions } from "@/lib/relations";
import { PageHeader } from "@/components/layout";
import EntityCard from "@/components/entities/EntityCard";
import EmptyState from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Entities — Moonwatch",
};

export default function EntitiesPage() {
  const entities = getAllEntities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Entities"
        description="Agencies, companies, and institutions shaping lunar exploration."
      />
      {entities.length === 0 ? (
        <EmptyState message="No entities found." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entities.map((entity) => {
            const missionCount = getEntityMissions(entity.id).length;
            return (
              <EntityCard
                key={entity.id}
                entity={entity}
                missionCount={missionCount}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

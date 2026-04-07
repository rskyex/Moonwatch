import type { Metadata } from "next";
import { getAllInfrastructure, getAllEntities } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";
import InfrastructureCard from "@/components/infrastructure/InfrastructureCard";
import EmptyState from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Infrastructure — Moonwatch",
};

export default function InfrastructurePage() {
  const projects = getAllInfrastructure();
  const allEntities = getAllEntities();

  return (
    <>
      <PageHeader
        title="Infrastructure"
        description="Hardware, vehicles, and systems supporting operations on and around the Moon."
      />
      {projects.length === 0 ? (
        <EmptyState message="No infrastructure projects found." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const entityNames = project.entityIds
              .map((id) => allEntities.find((e) => e.id === id)?.name)
              .filter((name): name is string => name != null);
            return (
              <InfrastructureCard
                key={project.id}
                project={project}
                entityNames={entityNames}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

import type { Metadata } from "next";
import { getAllInfrastructure, getAllEntities } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";
import InfrastructureCard from "@/components/infrastructure/InfrastructureCard";
import EmptyState from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Infrastructure — Moonwatch",
};

const CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: "landing-systems", label: "Landing Systems" },
  { key: "orbital", label: "Orbital Infrastructure" },
  { key: "logistics", label: "Logistics & Transport" },
  { key: "mobility", label: "Surface Mobility" },
  { key: "communications", label: "Communications" },
  { key: "navigation", label: "Navigation" },
  { key: "habitation", label: "Habitation" },
  { key: "power", label: "Power Systems" },
  { key: "isru", label: "In-Situ Resource Utilization" },
];

export default function InfrastructurePage() {
  const projects = getAllInfrastructure();
  const allEntities = getAllEntities();

  // Group projects by category
  const grouped = new Map<string, typeof projects>();
  for (const project of projects) {
    const cat = project.category ?? "__general__";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(project);
  }

  // Build ordered sections
  const sections: { label: string; items: typeof projects }[] = [];
  for (const { key, label } of CATEGORY_ORDER) {
    const items = grouped.get(key);
    if (items && items.length > 0) {
      sections.push({ label, items });
    }
  }
  // General section for projects without a category
  const general = grouped.get("__general__");
  if (general && general.length > 0) {
    sections.push({ label: "General", items: general });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Infrastructure"
        description="The hardware, systems, and capabilities being built for sustained lunar operations."
      />
      {projects.length === 0 ? (
        <EmptyState message="No infrastructure projects found." />
      ) : (
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.label}>
              <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
                {section.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((project) => {
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
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

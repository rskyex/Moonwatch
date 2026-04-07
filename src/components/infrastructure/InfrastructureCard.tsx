import { InfrastructureProject } from "@/types";
import { getInfrastructureTypeLabel, getProjectStatusColor } from "@/lib/formatting";
import { Card, StatusBadge, TagChip } from "@/components/shared";

const CATEGORY_LABELS: Record<string, string> = {
  "landing-systems": "Landing Systems",
  orbital: "Orbital Infrastructure",
  logistics: "Logistics & Transport",
  mobility: "Surface Mobility",
  communications: "Communications",
  navigation: "Navigation",
  habitation: "Habitation",
  power: "Power Systems",
  isru: "In-Situ Resource Utilization",
};

const MATURITY_LABELS: Record<string, string> = {
  conceptual: "Conceptual",
  prototype: "Prototype",
  "flight-proven": "Flight-Proven",
  "operational-heritage": "Operational Heritage",
};

interface InfrastructureCardProps {
  project: InfrastructureProject;
  entityNames?: string[];
}

export default function InfrastructureCard({ project, entityNames }: InfrastructureCardProps) {
  return (
    <Card href={`/infrastructure/${project.slug}`}>
      {project.category && (
        <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-accent mb-1">
          {CATEGORY_LABELS[project.category] ?? project.category}
        </p>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted font-medium uppercase tracking-wide">
            {getInfrastructureTypeLabel(project.type)}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground truncate">
            {project.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge label={project.status} colorClass={getProjectStatusColor(project.status)} />
          {project.maturity && (
            <span className="text-[10px] font-medium tracking-wide uppercase text-muted bg-surface-alt px-1.5 py-0.5 rounded">
              {MATURITY_LABELS[project.maturity] ?? project.maturity}
            </span>
          )}
        </div>
      </div>

      {entityNames && entityNames.length > 0 && (
        <p className="mt-2 text-xs text-muted">
          {entityNames.join(" · ")}
        </p>
      )}

      {project.description && (
        <p className="mt-3 text-sm text-muted line-clamp-2">
          {project.description}
        </p>
      )}

      {project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      )}
    </Card>
  );
}

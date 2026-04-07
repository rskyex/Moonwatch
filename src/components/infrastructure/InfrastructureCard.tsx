import { InfrastructureProject } from "@/types";
import { getInfrastructureTypeLabel, getProjectStatusColor } from "@/lib/formatting";
import { Card, StatusBadge, TagChip } from "@/components/shared";

interface InfrastructureCardProps {
  project: InfrastructureProject;
  entityNames?: string[];
}

export default function InfrastructureCard({ project, entityNames }: InfrastructureCardProps) {
  return (
    <Card href={`/infrastructure/${project.slug}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted font-medium uppercase tracking-wide">
            {getInfrastructureTypeLabel(project.type)}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground truncate">
            {project.name}
          </h3>
        </div>
        <StatusBadge label={project.status} colorClass={getProjectStatusColor(project.status)} />
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

import type { Entity } from "@/types";
import { Card, StatusBadge, TagChip } from "@/components/shared";
import { getEntityTypeLabel } from "@/lib/formatting";

interface EntityCardProps {
  entity: Entity;
  missionCount?: number;
}

export default function EntityCard({ entity, missionCount }: EntityCardProps) {
  return (
    <Card href={`/entities/${entity.slug}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground leading-snug">
            {entity.name}
          </h3>
          {entity.shortName && (
            <span className="text-sm text-muted">{entity.shortName}</span>
          )}
        </div>
        <StatusBadge label={getEntityTypeLabel(entity.type)} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        {entity.country && <span>{entity.country}</span>}
        {missionCount !== undefined && (
          <>
            {entity.country && <span aria-hidden="true">&middot;</span>}
            <span>
              {missionCount} {missionCount === 1 ? "mission" : "missions"}
            </span>
          </>
        )}
      </div>

      <p className="mt-3 text-sm text-muted line-clamp-2 leading-relaxed">
        {entity.description}
      </p>

      {entity.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entity.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      )}
    </Card>
  );
}

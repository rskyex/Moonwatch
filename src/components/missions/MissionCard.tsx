import type { Mission, Entity } from "@/types";
import { Card, StatusBadge, TagChip } from "@/components/shared";
import {
  getMissionStatusLabel,
  getMissionStatusColor,
  formatDate,
} from "@/lib/formatting";

interface MissionCardProps {
  mission: Mission;
  entities?: Entity[];
}

export default function MissionCard({ mission, entities }: MissionCardProps) {
  const statusLabel = getMissionStatusLabel(mission.status);
  const statusColor = getMissionStatusColor(mission.status);
  const entityNames = entities
    ?.slice(0, 2)
    .map((e) => e.shortName ?? e.name)
    .join(", ");

  return (
    <Card href={`/missions/${mission.slug}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground leading-snug">
          {mission.name}
        </h3>
        <StatusBadge label={statusLabel} colorClass={statusColor} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <span className="capitalize">{mission.type.replace("-", " ")}</span>
        {mission.launchDate && (
          <>
            <span aria-hidden="true">&middot;</span>
            <span>{formatDate(mission.launchDate)}</span>
          </>
        )}
        {entityNames && (
          <>
            <span aria-hidden="true">&middot;</span>
            <span>{entityNames}</span>
          </>
        )}
      </div>

      <p className="mt-3 text-sm text-muted line-clamp-2 leading-relaxed">
        {mission.description}
      </p>

      {mission.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {mission.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      )}
    </Card>
  );
}

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
    .join(" · ");

  return (
    <Card href={`/missions/${mission.slug}`}>
      {/* Mission type — small eyebrow */}
      <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted/60 mb-2">
        {mission.type.replace("-", " ")}
      </p>

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground leading-snug">
          {mission.name}
        </h3>
        <StatusBadge label={statusLabel} colorClass={statusColor} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        {mission.launchDate && (
          <time dateTime={mission.launchDate} className="tabular-nums">
            {formatDate(mission.launchDate)}
          </time>
        )}
        {entityNames && (
          <>
            {mission.launchDate && <span aria-hidden="true">&middot;</span>}
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

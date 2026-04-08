import type { Mission, Entity } from "@/types";
import { Card } from "@/components/shared";
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
      {/* Type eyebrow */}
      <p className="text-[10px] tracking-[0.15em] uppercase text-dim mb-2">
        {mission.type.replace("-", " ")}
      </p>

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-medium text-foreground leading-snug">
          {mission.name}
        </h3>
        <span className={`text-[11px] font-medium shrink-0 ${statusColor.split(" ")[0]}`}>
          {statusLabel}
        </span>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[11px] text-dim">
        {mission.launchDate && (
          <time dateTime={mission.launchDate} className="tabular-nums">
            {formatDate(mission.launchDate)}
          </time>
        )}
        {entityNames && (
          <>
            {mission.launchDate && <span>&middot;</span>}
            <span>{entityNames}</span>
          </>
        )}
      </div>

      <p className="mt-3 text-[13px] text-muted line-clamp-2 leading-relaxed">
        {mission.description}
      </p>
    </Card>
  );
}

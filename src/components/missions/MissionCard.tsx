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
    .join(" / ");
  const isActive = ["launched", "in-transit", "in-orbit", "on-surface"].includes(mission.status);

  return (
    <Card href={`/missions/${mission.slug}`}>
      {/* Meta line */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] tracking-[0.25em] uppercase text-dim">
          {mission.type.replace("-", " ")}
        </span>
        <span className={`text-[10px] tracking-wide ${isActive ? "text-cold/60" : statusColor.split(" ")[0]}`}>
          {statusLabel}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-[16px] font-light text-foreground leading-snug">
        {mission.name}
      </h3>

      {/* Context */}
      <div className="mt-1.5 flex items-center gap-2 text-[11px] text-dim">
        {mission.launchDate && (
          <time dateTime={mission.launchDate} className="tabular-nums font-mono">
            {formatDate(mission.launchDate)}
          </time>
        )}
        {entityNames && (
          <>
            {mission.launchDate && <span className="text-border">/</span>}
            <span>{entityNames}</span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 text-[13px] text-muted/70 font-light line-clamp-2 leading-relaxed">
        {mission.description}
      </p>
    </Card>
  );
}

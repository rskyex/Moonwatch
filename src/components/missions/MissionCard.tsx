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
      {/* Instrument header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-dim">
          {mission.type.replace("-", " ")}
        </span>
        <span className={`text-[9px] font-mono tracking-[0.1em] uppercase flex items-center gap-1.5 ${isActive ? "text-nominal/80" : statusColor.split(" ")[0]}`}>
          {isActive && <span className="w-1 h-1 rounded-full bg-nominal/60 animate-pulse" />}
          {statusLabel}
        </span>
      </div>

      {/* Mission name */}
      <h3 className="text-[15px] font-sans font-light text-foreground leading-snug">
        {mission.name}
      </h3>

      {/* Telemetry line */}
      <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-dim">
        {mission.launchDate && (
          <time dateTime={mission.launchDate} className="tabular-nums">
            {formatDate(mission.launchDate)}
          </time>
        )}
        {entityNames && (
          <>
            {mission.launchDate && <span className="text-border">|</span>}
            <span>{entityNames}</span>
          </>
        )}
      </div>

      {/* Brief */}
      <p className="mt-3 text-[12px] font-sans text-muted/70 font-light line-clamp-2 leading-relaxed">
        {mission.description}
      </p>
    </Card>
  );
}

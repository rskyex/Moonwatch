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
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] tracking-wide uppercase text-muted">
          {mission.type.replace("-", " ")}
        </span>
        <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${isActive ? "text-nominal" : statusColor.split(" ")[0]}`}>
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-nominal shadow-[0_0_4px_rgba(74,222,128,0.5)] animate-pulse" />}
          {statusLabel}
        </span>
      </div>

      <h3 className="text-[16px] font-semibold text-white leading-snug">
        {mission.name}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-[12px] text-muted">
        {mission.launchDate && (
          <time dateTime={mission.launchDate} className="font-mono tabular-nums">
            {formatDate(mission.launchDate)}
          </time>
        )}
        {entityNames && (
          <>
            {mission.launchDate && <span className="w-px h-3 bg-border" />}
            <span>{entityNames}</span>
          </>
        )}
      </div>

      <p className="mt-3 text-[13px] text-foreground line-clamp-2 leading-relaxed">
        {mission.description}
      </p>
    </Card>
  );
}

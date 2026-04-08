import { Milestone } from "@/types";
import { formatDate } from "@/lib/formatting";

interface MilestoneCardProps {
  milestone: Milestone;
  missionNames?: string[];
  entityNames?: string[];
}

export default function MilestoneCard({
  milestone,
  missionNames,
  entityNames,
}: MilestoneCardProps) {
  const isAchieved = milestone.status === "achieved";
  const isUpcoming = milestone.status === "upcoming" || milestone.status === "delayed";

  return (
    <div className={`flex gap-5 py-3 ${isAchieved ? "opacity-40" : ""}`}>
      {/* Date column */}
      <div className="w-20 shrink-0 text-right pt-0.5">
        <span className="text-[11px] text-dim tabular-nums font-mono">
          {formatDate(milestone.date, milestone.dateGranularity)}
        </span>
      </div>

      {/* Connector */}
      <div className="flex flex-col items-center pt-2">
        <span className={`w-1 h-1 rounded-full ${isUpcoming ? "bg-cold/50" : "bg-dim/40"}`} />
        <span className="w-px flex-1 bg-border/30 mt-1.5" />
      </div>

      {/* Content */}
      <div className="pb-5 min-w-0">
        <h3 className="text-[14px] font-light text-foreground leading-snug">
          {milestone.title}
        </h3>
        {(missionNames?.length || entityNames?.length) ? (
          <p className="mt-1 text-[10px] text-dim tracking-wide">
            {[...(missionNames ?? []), ...(entityNames ?? [])].join(" / ")}
          </p>
        ) : null}
        {milestone.description && (
          <p className="mt-1.5 text-[13px] text-muted/70 font-light leading-relaxed line-clamp-2">
            {milestone.description}
          </p>
        )}
      </div>
    </div>
  );
}

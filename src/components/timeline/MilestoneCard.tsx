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
    <div className={`flex gap-4 py-3 ${isAchieved ? "opacity-35" : ""}`}>
      {/* Timestamp */}
      <div className="w-20 shrink-0 text-right pt-0.5">
        <span className="text-[10px] font-mono text-dim tabular-nums">
          {formatDate(milestone.date, milestone.dateGranularity)}
        </span>
      </div>

      {/* Status indicator */}
      <div className="flex flex-col items-center pt-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? "bg-cold/60 animate-pulse" : "bg-dim/30"}`} />
        <span className="w-px flex-1 bg-border/40 mt-1" />
      </div>

      {/* Readout */}
      <div className="pb-5 min-w-0">
        <h3 className="text-[13px] font-sans font-light text-foreground leading-snug">
          {milestone.title}
        </h3>
        {(missionNames?.length || entityNames?.length) ? (
          <p className="mt-1 text-[9px] font-mono text-dim tracking-wider">
            {[...(missionNames ?? []), ...(entityNames ?? [])].join(" | ")}
          </p>
        ) : null}
        {milestone.description && (
          <p className="mt-1.5 text-[12px] font-sans text-muted/60 font-light leading-relaxed line-clamp-2">
            {milestone.description}
          </p>
        )}
      </div>
    </div>
  );
}

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
    <div className={`flex gap-5 py-4 ${isAchieved ? "opacity-40" : ""}`}>
      <div className="w-24 shrink-0 text-right pt-0.5">
        <span className="text-[11px] font-mono text-dim tabular-nums">
          {formatDate(milestone.date, milestone.dateGranularity)}
        </span>
      </div>

      <div className="flex flex-col items-center pt-1.5">
        <span className={`w-2 h-2 rounded-full ${isUpcoming ? "bg-cold shadow-[0_0_6px_rgba(34,211,238,0.4)] animate-pulse" : "bg-dim/40"}`} />
        <span className="w-px flex-1 bg-border/40 mt-1.5" />
      </div>

      <div className="pb-6 min-w-0">
        <h3 className="text-[14px] text-foreground leading-snug">
          {milestone.title}
        </h3>
        {(missionNames?.length || entityNames?.length) ? (
          <p className="mt-1.5 text-[10px] text-dim">
            {[...(missionNames ?? []), ...(entityNames ?? [])].join(" · ")}
          </p>
        ) : null}
        {milestone.description && (
          <p className="mt-2 text-[13px] text-muted leading-relaxed line-clamp-2">
            {milestone.description}
          </p>
        )}
      </div>
    </div>
  );
}

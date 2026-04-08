import { Milestone } from "@/types";
import { formatDate, getMilestoneStatusColor } from "@/lib/formatting";

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
  const dotColor = getMilestoneStatusColor(milestone.status).split(" ")[0]?.replace("text-", "bg-") ?? "bg-dim";
  const isAchieved = milestone.status === "achieved";

  return (
    <div className={`flex gap-4 py-3 ${isAchieved ? "opacity-50" : ""}`}>
      {/* Date */}
      <div className="w-24 shrink-0 text-right pt-0.5">
        <span className="text-[12px] text-dim tabular-nums">
          {formatDate(milestone.date, milestone.dateGranularity)}
        </span>
      </div>

      {/* Dot + line */}
      <div className="flex flex-col items-center">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-2`} />
        <span className="w-px flex-1 bg-border/40 mt-1" />
      </div>

      {/* Content */}
      <div className="pb-4 min-w-0">
        <h3 className="text-[14px] font-medium text-foreground leading-snug">
          {milestone.title}
        </h3>
        {(missionNames?.length || entityNames?.length) ? (
          <p className="mt-1 text-[11px] text-dim">
            {[...(missionNames ?? []), ...(entityNames ?? [])].join(" · ")}
          </p>
        ) : null}
        {milestone.description && (
          <p className="mt-1.5 text-[13px] text-muted leading-relaxed line-clamp-2">
            {milestone.description}
          </p>
        )}
      </div>
    </div>
  );
}

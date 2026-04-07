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
  const statusColor = getMilestoneStatusColor(milestone.status);
  const dotColor = statusColor.split(" ")[0]?.replace("text-", "bg-") ?? "bg-muted";
  const isAchieved = milestone.status === "achieved";

  return (
    <div className={`flex gap-5 ${isAchieved ? "opacity-60" : ""}`}>
      {/* Left: date column */}
      <div className="flex flex-col items-end w-28 shrink-0 pt-1">
        <span className="text-xs font-medium text-muted tabular-nums text-right w-full whitespace-nowrap">
          {formatDate(milestone.date, milestone.dateGranularity)}
        </span>
      </div>

      {/* Vertical connector */}
      <div className="flex flex-col items-center">
        <span
          className={`w-2 h-2 rounded-full ${dotColor} shrink-0 mt-1.5 ring-2 ring-background`}
        />
        <span className="w-px flex-1 bg-border" />
      </div>

      {/* Right: content */}
      <div className="pb-8 min-w-0">
        <h3 className="text-sm font-semibold text-foreground leading-snug">
          {milestone.title}
        </h3>

        {(missionNames?.length || entityNames?.length) ? (
          <p className="mt-1 text-[11px] text-muted/70">
            {[...(missionNames ?? []), ...(entityNames ?? [])].join(" · ")}
          </p>
        ) : null}

        {milestone.description && (
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
            {milestone.description}
          </p>
        )}
      </div>
    </div>
  );
}

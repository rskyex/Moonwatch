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
  // Extract the text color portion for the dot (e.g. "text-green-600")
  const dotColor = statusColor.split(" ")[0]?.replace("text-", "bg-") ?? "bg-muted";

  return (
    <div className="flex gap-5 group">
      {/* Left: date column + connecting line */}
      <div className="flex flex-col items-center w-28 shrink-0 pt-1">
        <span className="text-xs font-medium text-muted text-right w-full whitespace-nowrap">
          {formatDate(milestone.date, milestone.dateGranularity)}
        </span>
      </div>

      {/* Vertical line + dot connector */}
      <div className="flex flex-col items-center">
        <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0 mt-1.5`} />
        <span className="w-px flex-1 bg-border" />
      </div>

      {/* Right: content */}
      <div className="pb-8 min-w-0">
        <h3 className="text-sm font-semibold text-foreground leading-snug">
          {milestone.title}
        </h3>

        {(missionNames?.length || entityNames?.length) && (
          <p className="mt-1 text-xs text-muted">
            {[...(missionNames ?? []), ...(entityNames ?? [])].join(" · ")}
          </p>
        )}

        {milestone.description && (
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
            {milestone.description}
          </p>
        )}
      </div>
    </div>
  );
}

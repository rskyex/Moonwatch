import type { Update } from "@/types";
import { Card, StatusBadge } from "@/components/shared";
import {
  getSignificanceLabel,
  getSignificanceColor,
  formatDate,
} from "@/lib/formatting";

interface UpdateCardProps {
  update: Update;
  sourceName?: string;
  missionNames?: string[];
  entityNames?: string[];
}

export default function UpdateCard({
  update,
  sourceName,
  missionNames,
  entityNames,
}: UpdateCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        {/* Significance indicator — vertical accent bar */}
        <div className="flex flex-col items-center pt-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${getSignificanceColor(update.significance).split(" ")[0].replace("text-", "bg-")}`}
          />
          <div className="w-px h-full bg-border mt-1.5" />
        </div>

        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge
              label={getSignificanceLabel(update.significance)}
              colorClass={getSignificanceColor(update.significance)}
            />
            <time dateTime={update.date} className="text-[11px] text-muted/70 tabular-nums">
              {formatDate(update.date)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {update.title}
          </h3>

          {/* Summary */}
          <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
            {update.summary}
          </p>

          {/* Associations + source */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {missionNames?.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium bg-accent-soft text-accent border border-accent/10"
              >
                {name}
              </span>
            ))}
            {entityNames?.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] text-muted bg-surface-alt border border-border"
              >
                {name}
              </span>
            ))}
            {sourceName && (
              <span className="text-[10px] text-muted/50 ml-auto">
                via {sourceName}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

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
      <div className="flex items-start gap-3">
        <StatusBadge
          label={getSignificanceLabel(update.significance)}
          colorClass={getSignificanceColor(update.significance)}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {update.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted line-clamp-3 leading-relaxed">
            {update.summary}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <time dateTime={update.date}>{formatDate(update.date)}</time>
            {sourceName && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{sourceName}</span>
              </>
            )}
          </div>

          {(missionNames?.length || entityNames?.length) && (
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
              {missionNames?.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center rounded bg-accent-soft px-1.5 py-0.5 text-accent"
                >
                  {name}
                </span>
              ))}
              {entityNames?.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center rounded bg-surface-alt px-1.5 py-0.5"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

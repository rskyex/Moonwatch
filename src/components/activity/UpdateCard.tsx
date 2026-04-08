import type { Update } from "@/types";
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

/** Editorial update item — not a card, a structured text entry */
export default function UpdateCard({
  update,
  sourceName,
  missionNames,
  entityNames,
}: UpdateCardProps) {
  const sigColor = getSignificanceColor(update.significance).split(" ")[0]?.replace("text-", "bg-") || "bg-dim";

  return (
    <article className="py-4 border-b border-border/40 last:border-0">
      <div className="flex items-start gap-3">
        {/* Significance dot */}
        <div className={`w-1.5 h-1.5 rounded-full ${sigColor} mt-2 shrink-0`} />

        <div className="min-w-0 flex-1">
          {/* Meta line */}
          <div className="flex items-center gap-2 text-[11px] text-dim mb-1">
            <time dateTime={update.date} className="tabular-nums">
              {formatDate(update.date)}
            </time>
            <span className="text-border">&middot;</span>
            <span className={getSignificanceColor(update.significance).split(" ")[0]}>
              {getSignificanceLabel(update.significance)}
            </span>
            {sourceName && (
              <>
                <span className="text-border">&middot;</span>
                <span>{sourceName}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[14px] font-medium text-foreground leading-snug">
            {update.title}
          </h3>

          {/* Summary */}
          <p className="mt-1.5 text-[13px] text-muted leading-relaxed line-clamp-2">
            {update.summary}
          </p>

          {/* Associations */}
          {(missionNames?.length || entityNames?.length) ? (
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-dim">
              {missionNames?.map((name) => (
                <span key={name} className="text-foreground">{name}</span>
              ))}
              {entityNames?.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

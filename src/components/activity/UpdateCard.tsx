import type { Update } from "@/types";
import {
  getSignificanceLabel,
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
  const isCritical = update.significance === "critical" || update.significance === "major";

  return (
    <article className="py-5 border-b border-border/30 last:border-0 group">
      {/* Meta line */}
      <div className="flex items-center gap-2 text-[10px] text-dim mb-2 tracking-wide">
        <time dateTime={update.date} className="tabular-nums font-mono">
          {formatDate(update.date)}
        </time>
        <span className="text-border">/</span>
        <span className={isCritical ? "text-cold/60" : ""}>
          {getSignificanceLabel(update.significance)}
        </span>
        {sourceName && (
          <>
            <span className="text-border">/</span>
            <span>{sourceName}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-light text-foreground leading-snug">
        {update.title}
      </h3>

      {/* Summary */}
      <p className="mt-2 text-[13px] text-muted font-light leading-[1.7] line-clamp-2">
        {update.summary}
      </p>

      {/* Associations */}
      {(missionNames?.length || entityNames?.length) ? (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 text-[10px] tracking-wide text-dim">
          {missionNames?.map((name) => (
            <span key={name} className="text-muted">{name}</span>
          ))}
          {entityNames?.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

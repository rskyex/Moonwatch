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
    <article className="py-5 border-b border-border last:border-0 group">
      {/* Meta */}
      <div className="flex items-center gap-2.5 text-[11px] text-muted mb-2">
        <time dateTime={update.date} className="font-mono tabular-nums">
          {formatDate(update.date)}
        </time>
        <span className="w-px h-3 bg-border" />
        <span className={`flex items-center gap-1.5 ${isCritical ? "text-cold font-semibold" : ""}`}>
          {isCritical && <span className="w-1.5 h-1.5 rounded-full bg-cold shadow-[0_0_4px_rgba(34,211,238,0.5)]" />}
          {getSignificanceLabel(update.significance)}
        </span>
        {sourceName && (
          <>
            <span className="w-px h-3 bg-border" />
            <span>{sourceName}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold text-white leading-snug group-hover:text-cold transition-colors">
        {update.title}
      </h3>

      {/* Summary */}
      <p className="mt-2 text-[14px] text-foreground leading-relaxed line-clamp-2">
        {update.summary}
      </p>

      {/* Tags */}
      {(missionNames?.length || entityNames?.length) ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
          {missionNames?.map((name) => (
            <span key={name} className="px-2.5 py-1 rounded bg-cold/10 text-cold border border-cold/20 font-medium">
              {name}
            </span>
          ))}
          {entityNames?.map((name) => (
            <span key={name} className="px-2.5 py-1 rounded bg-surface-alt text-foreground border border-border">
              {name}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

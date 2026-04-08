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
    <article className="py-4 border-b border-border/50 last:border-0">
      {/* Telemetry header */}
      <div className="flex items-center gap-2 text-[9px] font-mono text-dim tracking-wider mb-2">
        <time dateTime={update.date} className="tabular-nums text-muted">
          {formatDate(update.date)}
        </time>
        <span className="text-border">|</span>
        <span className={`flex items-center gap-1 ${isCritical ? "text-cold/70" : ""}`}>
          {isCritical && <span className="w-1 h-1 rounded-full bg-cold/50" />}
          {getSignificanceLabel(update.significance)}
        </span>
        {sourceName && (
          <>
            <span className="text-border">|</span>
            <span>{sourceName}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-sans font-light text-foreground leading-snug">
        {update.title}
      </h3>

      {/* Summary */}
      <p className="mt-1.5 text-[12px] font-sans text-muted font-light leading-[1.7] line-clamp-2">
        {update.summary}
      </p>

      {/* Association tags */}
      {(missionNames?.length || entityNames?.length) ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[9px] font-mono tracking-wider text-dim">
          {missionNames?.map((name) => (
            <span key={name} className="text-cold/50">{name}</span>
          ))}
          {entityNames?.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

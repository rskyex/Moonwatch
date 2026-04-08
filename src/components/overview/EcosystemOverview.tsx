import Link from "next/link";
import type { ActorProfile } from "@/lib/intelligence";

interface EcosystemOverviewProps {
  actors: ActorProfile[];
}

/** Actor ecosystem — horizontal, text-led, editorial */
export default function EcosystemOverview({ actors }: EcosystemOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
      {actors.slice(0, 8).map(({ entity, missionCount, programs }) => (
        <Link
          key={entity.id}
          href={`/entities/${entity.slug}`}
          className="group flex items-baseline justify-between py-2 border-b border-border/40 hover:border-muted/40 transition-colors"
        >
          <div className="min-w-0">
            <span className="text-[13px] font-medium text-foreground group-hover:text-accent transition-colors">
              {entity.shortName || entity.name}
            </span>
            {programs.length > 0 && (
              <span className="ml-2 text-[11px] text-dim">
                {programs.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
          <span className="text-[11px] text-dim tabular-nums ml-3 shrink-0">
            {missionCount} {missionCount === 1 ? "mission" : "missions"}
          </span>
        </Link>
      ))}
    </div>
  );
}

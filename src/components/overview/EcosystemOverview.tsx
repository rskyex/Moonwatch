import Link from "next/link";
import type { ActorProfile } from "@/lib/intelligence";

interface EcosystemOverviewProps {
  actors: ActorProfile[];
}

export default function EcosystemOverview({ actors }: EcosystemOverviewProps) {
  return (
    <div className="space-y-1">
      {actors.slice(0, 8).map(({ entity, missionCount, programs }) => (
        <Link
          key={entity.id}
          href={`/entities/${entity.slug}`}
          className="group flex items-center justify-between py-3 border-b border-border/30 hover:border-cold/20 transition-colors"
        >
          <div className="min-w-0 flex items-center gap-3">
            <span className="text-[14px] text-foreground group-hover:text-cold transition-colors">
              {entity.shortName || entity.name}
            </span>
            {programs.length > 0 && (
              <span className="text-[10px] text-dim hidden sm:inline">
                {programs.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-cold/60 tabular-nums ml-3 shrink-0">
            {missionCount}
          </span>
        </Link>
      ))}
    </div>
  );
}

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
          className="group flex items-center justify-between py-3 border-b border-border/50 hover:border-cold/25 transition-colors"
        >
          <div className="min-w-0 flex items-center gap-3">
            <span className="text-[14px] font-medium text-white group-hover:text-cold transition-colors">
              {entity.shortName || entity.name}
            </span>
            {programs.length > 0 && (
              <span className="text-[11px] text-muted hidden sm:inline">
                {programs.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
          <span className="text-[12px] font-mono text-cold/70 tabular-nums ml-3 shrink-0">
            {missionCount}
          </span>
        </Link>
      ))}
    </div>
  );
}

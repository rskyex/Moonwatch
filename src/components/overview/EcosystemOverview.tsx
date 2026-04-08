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
          className="group flex items-center justify-between py-2 border-b border-border/30 hover:border-cold/15 transition-colors"
        >
          <div className="min-w-0 flex items-center gap-3">
            <span className="text-[13px] font-sans font-light text-foreground group-hover:text-cold transition-colors">
              {entity.shortName || entity.name}
            </span>
            {programs.length > 0 && (
              <span className="text-[9px] font-mono text-dim/50 tracking-wider">
                {programs.slice(0, 2).join(" / ")}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-dim tabular-nums ml-3 shrink-0">
            {missionCount}
          </span>
        </Link>
      ))}
    </div>
  );
}

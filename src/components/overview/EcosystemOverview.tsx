import Link from "next/link";
import type { ActorProfile } from "@/lib/intelligence";

interface EcosystemOverviewProps {
  actors: ActorProfile[];
}

export default function EcosystemOverview({ actors }: EcosystemOverviewProps) {
  return (
    <div className="space-y-3">
      {actors.slice(0, 8).map(({ entity, missionCount, programs }) => (
        <Link
          key={entity.id}
          href={`/entities/${entity.slug}`}
          className="group flex items-baseline justify-between py-1.5"
        >
          <div className="min-w-0 flex items-baseline gap-2">
            <span className="text-[14px] font-light text-foreground group-hover:text-cold transition-colors">
              {entity.shortName || entity.name}
            </span>
            {programs.length > 0 && (
              <span className="text-[10px] text-dim/60 tracking-wide">
                {programs.slice(0, 2).join(" / ")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-3 shrink-0">
            <span className="text-[11px] text-dim tabular-nums">{missionCount}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

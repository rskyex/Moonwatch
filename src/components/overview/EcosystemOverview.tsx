import Link from "next/link";
import type { ActorProfile } from "@/lib/intelligence";

interface EcosystemOverviewProps {
  actors: ActorProfile[];
}

export default function EcosystemOverview({ actors }: EcosystemOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {actors.slice(0, 6).map(({ entity, missionCount, infraCount, partnerCount, programs }) => (
        <Link
          key={entity.id}
          href={`/entities/${entity.slug}`}
          className="group p-4 rounded-lg border border-border bg-surface hover:border-accent/20 hover:shadow-[0_0_20px_var(--glow)] transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                {entity.shortName || entity.name}
              </p>
              <p className="text-[10px] text-muted/60 tracking-wide uppercase mt-0.5">
                {entity.country || entity.type.replace(/-/g, " ")}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-muted">
            <span><span className="text-foreground font-medium tabular-nums">{missionCount}</span> missions</span>
            <span><span className="text-foreground font-medium tabular-nums">{infraCount}</span> systems</span>
            <span><span className="text-foreground font-medium tabular-nums">{partnerCount}</span> partners</span>
          </div>
          {programs.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {programs.slice(0, 3).map(p => (
                <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-accent-soft text-accent border border-accent/10">{p}</span>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

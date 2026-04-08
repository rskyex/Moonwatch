import Link from "next/link";
import type { MissionsByStatusGroup } from "@/lib/intelligence";

interface MissionStatusOverviewProps {
  groups: MissionsByStatusGroup[];
}

export default function MissionStatusOverview({ groups }: MissionStatusOverviewProps) {
  const active = groups.filter(g =>
    ["on-surface", "in-orbit", "in-transit", "launched"].includes(g.status)
  );
  const developing = groups.filter(g =>
    ["in-development", "planned"].includes(g.status)
  );
  const concluded = groups.filter(g =>
    ["completed", "failed", "lost"].includes(g.status)
  );

  return (
    <div className="space-y-8">
      {active.length > 0 && (
        <div className="p-4 bg-surface border border-cold/15 rounded-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-nominal animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-nominal/80">
              Active Missions
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {active.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[14px] font-sans font-light text-foreground hover:text-cold transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {developing.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-caution/40" />
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-caution/60">
              In Development
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {developing.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[13px] font-sans font-light text-muted hover:text-foreground transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {concluded.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-dim/40" />
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-dim/60">
              Concluded
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {concluded.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[12px] font-sans font-light text-dim hover:text-muted transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

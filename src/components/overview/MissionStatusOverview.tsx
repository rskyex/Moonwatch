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
        <div className="p-5 bg-surface backdrop-blur-lg border border-nominal/15 rounded-lg shadow-[0_0_20px_rgba(52,211,153,0.03)]">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-nominal shadow-[0_0_6px_rgba(52,211,153,0.4)] animate-pulse" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-nominal/90 font-medium">
              Active Missions
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {active.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[15px] font-light text-foreground hover:text-cold transition-colors"
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
            <span className="w-1.5 h-1.5 rounded-full bg-caution/50" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-caution/70 font-medium">
              In Development
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {developing.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[14px] text-muted hover:text-foreground transition-colors"
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
            <span className="w-1.5 h-1.5 rounded-full bg-dim/50" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-dim font-medium">
              Concluded
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {concluded.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[13px] text-dim hover:text-muted transition-colors"
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

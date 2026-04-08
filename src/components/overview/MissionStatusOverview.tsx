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
        <div className="p-5 bg-surface border border-nominal/20 rounded-lg shadow-[0_0_30px_rgba(74,222,128,0.04)]">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-nominal shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse" />
            <span className="text-[12px] tracking-wide uppercase text-nominal font-semibold">
              Active Missions
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {active.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[16px] text-white hover:text-cold transition-colors"
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
            <span className="w-2 h-2 rounded-full bg-caution/50" />
            <span className="text-[12px] tracking-wide uppercase text-caution/80 font-semibold">
              In Development
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {developing.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[15px] text-foreground hover:text-cold transition-colors"
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
            <span className="w-2 h-2 rounded-full bg-dim" />
            <span className="text-[12px] tracking-wide uppercase text-dim font-semibold">
              Concluded
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {concluded.flatMap(g => g.missions).map(m => (
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
    </div>
  );
}

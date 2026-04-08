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
    <div className="space-y-10">
      {active.length > 0 && (
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-cold/60 mb-4 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cold/40" />
            Active
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
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
          <p className="text-[10px] tracking-[0.3em] uppercase text-dim mb-4">
            In Development
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {developing.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[14px] font-light text-muted hover:text-foreground transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {concluded.length > 0 && (
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-dim/60 mb-4">
            Concluded
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {concluded.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[13px] font-light text-dim hover:text-muted transition-colors"
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

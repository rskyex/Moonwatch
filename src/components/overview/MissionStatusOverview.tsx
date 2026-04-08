import Link from "next/link";
import type { MissionsByStatusGroup } from "@/lib/intelligence";

interface MissionStatusOverviewProps {
  groups: MissionsByStatusGroup[];
}

/** Editorial mission status — text-led, not chart-led */
export default function MissionStatusOverview({ groups }: MissionStatusOverviewProps) {
  const active = groups.filter(g =>
    ["on-surface", "in-orbit", "in-transit", "launched"].includes(g.status)
  );
  const developing = groups.filter(g =>
    ["in-development", "planned"].includes(g.status)
  );

  return (
    <div className="space-y-8">
      {active.length > 0 && (
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-dim mb-3">Active</p>
          <div className="flex flex-wrap gap-2">
            {active.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[13px] text-foreground hover:text-accent transition-colors"
              >
                {m.name}
                <span className="text-dim ml-1">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {developing.length > 0 && (
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-dim mb-3">In Development</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {developing.flatMap(g => g.missions).map(m => (
              <Link
                key={m.id}
                href={`/missions/${m.slug}`}
                className="text-[13px] text-muted hover:text-foreground transition-colors"
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

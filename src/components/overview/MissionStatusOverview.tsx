import Link from "next/link";
import type { MissionsByStatusGroup } from "@/lib/intelligence";
import { getMissionStatusColor } from "@/lib/formatting";

interface MissionStatusOverviewProps {
  groups: MissionsByStatusGroup[];
}

export default function MissionStatusOverview({ groups }: MissionStatusOverviewProps) {
  const total = groups.reduce((sum, g) => sum + g.count, 0);
  return (
    <div>
      {/* Status bar */}
      <div className="flex h-2 rounded-full overflow-hidden bg-surface-alt mb-4">
        {groups.map(g => {
          const colorClass = getMissionStatusColor(g.status as any);
          // Extract bg- class from the colorClass string
          const bgClass = colorClass.split(" ").find(c => c.startsWith("bg-")) || "bg-muted";
          return (
            <div
              key={g.status}
              className={`${bgClass} transition-all`}
              style={{ width: `${(g.count / total) * 100}%` }}
              title={`${g.label}: ${g.count}`}
            />
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {groups.map(g => (
          <div key={g.status} className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${getMissionStatusColor(g.status as any).split(" ").find(c => c.startsWith("bg-")) || "bg-muted"}`} />
            <span className="text-muted">{g.label}</span>
            <span className="text-foreground font-medium tabular-nums">{g.count}</span>
          </div>
        ))}
      </div>
      {/* Mission list per group */}
      <div className="mt-4 space-y-3">
        {groups.filter(g => ["on-surface", "in-orbit", "in-transit", "launched", "in-development", "planned"].includes(g.status)).map(g => (
          <div key={g.status}>
            <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted/60 mb-1.5">{g.label}</p>
            <div className="flex flex-wrap gap-2">
              {g.missions.map(m => (
                <Link
                  key={m.id}
                  href={`/missions/${m.slug}`}
                  className="text-xs px-2 py-1 rounded border border-border bg-surface hover:border-accent/20 text-foreground transition-colors"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { RegionActivity } from "@/lib/intelligence";

interface RegionActivityMapProps {
  regions: RegionActivity[];
}

export default function RegionActivityMap({ regions }: RegionActivityMapProps) {
  return (
    <div className="space-y-1">
      {regions.map(({ region, missionCount, activeMissions, upcomingMissions }) => (
        <Link
          key={region.id}
          href={`/regions/${region.slug}`}
          className="group flex items-center justify-between py-2 border-b border-border/30 hover:border-cold/15 transition-colors"
        >
          <div className="min-w-0 flex items-center gap-3">
            <span className="text-[13px] font-sans font-light text-foreground group-hover:text-cold transition-colors">
              {region.name}
            </span>
            {region.coordinates && (
              <span className="text-[8px] font-mono text-dim/40 tracking-widest">
                {region.coordinates.lat.toFixed(0)}&deg;
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 ml-3 shrink-0 text-[9px] font-mono tabular-nums">
            {activeMissions.length > 0 && (
              <span className="text-nominal/60">{activeMissions.length} active</span>
            )}
            {upcomingMissions.length > 0 && (
              <span className="text-cold/40">{upcomingMissions.length} planned</span>
            )}
            {activeMissions.length === 0 && upcomingMissions.length === 0 && (
              <span className="text-dim/40">{missionCount}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

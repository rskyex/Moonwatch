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
          className="group flex items-center justify-between py-3 border-b border-border/50 hover:border-cold/25 transition-colors"
        >
          <div className="min-w-0 flex items-center gap-3">
            <span className="text-[14px] font-medium text-white group-hover:text-cold transition-colors">
              {region.name}
            </span>
            {region.coordinates && (
              <span className="text-[10px] font-mono text-muted hidden sm:inline">
                {region.coordinates.lat.toFixed(0)}&deg;
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 ml-3 shrink-0 text-[11px] tabular-nums font-medium">
            {activeMissions.length > 0 && (
              <span className="text-nominal">{activeMissions.length} active</span>
            )}
            {upcomingMissions.length > 0 && (
              <span className="text-cold/70">{upcomingMissions.length} planned</span>
            )}
            {activeMissions.length === 0 && upcomingMissions.length === 0 && (
              <span className="text-muted">{missionCount}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

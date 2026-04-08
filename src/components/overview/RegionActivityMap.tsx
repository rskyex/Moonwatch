import Link from "next/link";
import type { RegionActivity } from "@/lib/intelligence";

interface RegionActivityMapProps {
  regions: RegionActivity[];
}

export default function RegionActivityMap({ regions }: RegionActivityMapProps) {
  return (
    <div className="space-y-3">
      {regions.map(({ region, missionCount, activeMissions, upcomingMissions }) => (
        <Link
          key={region.id}
          href={`/regions/${region.slug}`}
          className="group flex items-baseline justify-between py-1.5"
        >
          <div className="min-w-0 flex items-baseline gap-2">
            <span className="text-[14px] font-light text-foreground group-hover:text-cold transition-colors">
              {region.name}
            </span>
            {region.coordinates && (
              <span className="text-[9px] text-dim/50 font-mono tracking-wider">
                {region.coordinates.lat.toFixed(0)}&deg;
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 ml-3 shrink-0 text-[11px] tabular-nums">
            {activeMissions.length > 0 && (
              <span className="text-cold/70">{activeMissions.length} active</span>
            )}
            {upcomingMissions.length > 0 && (
              <span className="text-dim">{upcomingMissions.length} planned</span>
            )}
            {activeMissions.length === 0 && upcomingMissions.length === 0 && (
              <span className="text-dim/50">{missionCount}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

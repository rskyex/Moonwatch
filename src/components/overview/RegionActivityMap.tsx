import Link from "next/link";
import type { RegionActivity } from "@/lib/intelligence";

interface RegionActivityMapProps {
  regions: RegionActivity[];
}

/** Region activity — text-led list, not card grid */
export default function RegionActivityMap({ regions }: RegionActivityMapProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
      {regions.map(({ region, missionCount, activeMissions, upcomingMissions }) => (
        <Link
          key={region.id}
          href={`/regions/${region.slug}`}
          className="group flex items-start justify-between py-2 border-b border-border/40 hover:border-muted/40 transition-colors"
        >
          <div className="min-w-0">
            <span className="text-[13px] font-medium text-foreground group-hover:text-accent transition-colors">
              {region.name}
            </span>
            {region.coordinates && (
              <span className="ml-2 text-[10px] text-dim font-mono">
                {region.coordinates.lat.toFixed(0)}&deg;
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[11px] tabular-nums shrink-0 ml-3">
            {activeMissions.length > 0 && (
              <span className="text-foreground">{activeMissions.length} active</span>
            )}
            {upcomingMissions.length > 0 && (
              <span className="text-dim">{upcomingMissions.length} upcoming</span>
            )}
            {activeMissions.length === 0 && upcomingMissions.length === 0 && (
              <span className="text-dim">{missionCount} total</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

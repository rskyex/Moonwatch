import Link from "next/link";
import type { RegionActivity } from "@/lib/intelligence";

interface RegionActivityMapProps {
  regions: RegionActivity[];
}

export default function RegionActivityMap({ regions }: RegionActivityMapProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {regions.map(({ region, missionCount, activeMissions, upcomingMissions }) => (
        <Link
          key={region.id}
          href={`/regions/${region.slug}`}
          className="group p-4 rounded-lg border border-border bg-surface hover:border-accent/20 transition-all"
        >
          <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{region.name}</p>
          {region.coordinates && (
            <p className="text-[10px] text-muted/60 font-mono mt-0.5">
              {region.coordinates.lat.toFixed(1)}&deg; {region.coordinates.lng.toFixed(1)}&deg;
            </p>
          )}
          <div className="mt-3 flex gap-4 text-xs text-muted">
            <span><span className="text-foreground font-medium tabular-nums">{missionCount}</span> total</span>
            {activeMissions.length > 0 && (
              <span className="text-green-500"><span className="font-medium tabular-nums">{activeMissions.length}</span> active</span>
            )}
            {upcomingMissions.length > 0 && (
              <span className="text-blue-400"><span className="font-medium tabular-nums">{upcomingMissions.length}</span> upcoming</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

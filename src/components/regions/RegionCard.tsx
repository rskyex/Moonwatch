import { LunarRegion } from "@/types";
import { Card } from "@/components/shared";

interface RegionCardProps {
  region: LunarRegion;
  missionCount?: number;
  snippet?: string;
}

export default function RegionCard({ region, missionCount, snippet }: RegionCardProps) {
  return (
    <Card href={`/regions/${region.slug}`}>
      <h3 className="text-base font-semibold text-foreground">
        {region.name}
      </h3>

      {region.coordinates && (
        <p className="mt-1 text-xs text-muted font-mono">
          {region.coordinates.lat.toFixed(2)}° N, {region.coordinates.lng.toFixed(2)}° E
        </p>
      )}

      {snippet && (
        <p className="mt-3 text-sm text-muted line-clamp-2">
          {snippet}
        </p>
      )}

      {!snippet && region.significance && (
        <p className="mt-3 text-sm text-muted line-clamp-2">
          {region.significance}
        </p>
      )}

      {missionCount !== undefined && (
        <p className="mt-3 text-xs text-muted">
          {missionCount} {missionCount === 1 ? "mission" : "missions"}
        </p>
      )}
    </Card>
  );
}

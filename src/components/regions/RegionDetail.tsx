import Link from "next/link";
import { LunarRegion, Mission } from "@/types";
import { getMissionStatusLabel, getMissionStatusColor } from "@/lib/formatting";
import { StatusBadge } from "@/components/shared";

interface RegionDetailProps {
  region: LunarRegion;
  missions: Mission[];
}

export default function RegionDetail({ region, missions }: RegionDetailProps) {
  return (
    <article>
      {/* Header */}
      <header className="border-b border-border pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {region.name}
        </h1>
        {region.coordinates && (
          <p className="mt-2 text-sm text-muted font-mono">
            {region.coordinates.lat.toFixed(4)}° N, {region.coordinates.lng.toFixed(4)}° E
          </p>
        )}
      </header>

      {/* Description */}
      {region.description && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Description
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {region.description}
          </p>
        </section>
      )}

      {/* Significance */}
      {region.significance && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Significance
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {region.significance}
          </p>
        </section>
      )}

      {/* Missions */}
      {missions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Missions
          </h2>
          <ul className="space-y-2">
            {missions.map((mission) => (
              <li key={mission.id} className="flex items-center gap-2">
                <Link
                  href={`/missions/${mission.slug}`}
                  className="text-sm text-accent hover:underline"
                >
                  {mission.name}
                </Link>
                <StatusBadge
                  label={getMissionStatusLabel(mission.status)}
                  colorClass={getMissionStatusColor(mission.status)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

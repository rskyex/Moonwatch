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
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
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
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Significance
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {region.significance}
          </p>
        </section>
      )}

      {/* Scientific Interest */}
      {region.scientificInterest && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Scientific Interest
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {region.scientificInterest}
          </p>
        </section>
      )}

      {/* Strategic Interest */}
      {region.strategicInterest && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Strategic Interest
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {region.strategicInterest}
          </p>
        </section>
      )}

      {/* Resources */}
      {region.resources && region.resources.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Resources
          </h2>
          <div className="flex flex-wrap gap-2">
            {region.resources.map((resource) => (
              <span
                key={resource}
                className="inline-block text-xs font-medium text-muted bg-muted/10 border border-border rounded-full px-3 py-1"
              >
                {resource}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Terrain */}
      {region.terrain && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Terrain
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {region.terrain}
          </p>
        </section>
      )}

      {/* Related Missions */}
      {missions.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Related Missions
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

      {/* Source Trail */}
      {region.sources && region.sources.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Source Trail
          </h2>
          <ul className="space-y-1">
            {region.sources.map((source) => (
              <li key={source.sourceId}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline break-all"
                >
                  {source.url}
                </a>
                {source.quote && (
                  <p className="text-xs text-muted italic mt-0.5 ml-2">
                    &ldquo;{source.quote}&rdquo;
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

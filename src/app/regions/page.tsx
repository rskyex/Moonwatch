import type { Metadata } from "next";
import { getAllRegions, getMissionsByRegion } from "@/lib/data-access";
import { MAJOR_LUNAR_FEATURES } from "@/adapters/usgs-moon";
import { PageHeader } from "@/components/layout";
import RegionCard from "@/components/regions/RegionCard";
import LunarMap from "@/components/regions/LunarMap";
import EmptyState from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Lunar Surface — Moonwatch",
};

export default function RegionsPage() {
  const regions = getAllRegions();
  const features = MAJOR_LUNAR_FEATURES;

  const regionMarkers = regions.map((region) => ({
    id: region.id,
    slug: region.slug,
    name: region.name,
    coordinates: region.coordinates,
    missionCount: getMissionsByRegion(region.id).length,
  }));

  const featureMarkers = features.slice(0, 30).map((f) => ({
    id: f.id,
    name: f.name,
    featureType: f.featureType,
    coordinates: f.coordinates,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Lunar Surface"
        description="Sites of scientific and strategic interest across the Moon — where missions, resources, and infrastructure converge."
      />

      {/* Map visualization */}
      <section className="mb-16">
        <LunarMap regions={regionMarkers} features={featureMarkers} />
      </section>

      {/* Region cards */}
      {regions.length === 0 ? (
        <EmptyState message="No regions tracked yet." />
      ) : (
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-dim mb-6 flex items-center gap-2">
            <span className="w-0.5 h-0.5 rounded-full bg-cold/40" />
            Tracked Regions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((region) => {
              const missionCount = getMissionsByRegion(region.id).length;
              return (
                <RegionCard
                  key={region.id}
                  region={region}
                  missionCount={missionCount}
                  snippet={region.terrain ?? region.significance}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

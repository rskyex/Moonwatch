import type { Metadata } from "next";
import { getAllRegions, getMissionsByRegion } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";
import RegionCard from "@/components/regions/RegionCard";
import EmptyState from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Lunar Regions — Moonwatch",
};

export default function RegionsPage() {
  const regions = getAllRegions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Lunar Regions"
        description="Sites of scientific and strategic interest on the Moon — where exploration meets geology, resources, and long-term settlement."
      />
      {regions.length === 0 ? (
        <EmptyState message="No regions tracked yet." />
      ) : (
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
      )}
    </div>
  );
}

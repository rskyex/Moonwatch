import type { Metadata } from "next";
import { getAllRegions, getMissionsByRegion } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";
import RegionCard from "@/components/regions/RegionCard";
import EmptyState from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Regions — Moonwatch",
};

export default function RegionsPage() {
  const regions = getAllRegions();

  return (
    <>
      <PageHeader
        title="Lunar Regions"
        description="Areas of scientific and strategic interest on the Moon."
      />
      {regions.length === 0 ? (
        <EmptyState message="No regions found." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regions.map((region) => {
            const missionCount = getMissionsByRegion(region.id).length;
            return (
              <RegionCard
                key={region.id}
                region={region}
                missionCount={missionCount}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

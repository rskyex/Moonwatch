import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegionBySlug } from "@/lib/data-access";
import { getRegionMissions } from "@/lib/relations";
import RegionDetail from "@/components/regions/RegionDetail";
import { getRegionInfrastructure } from "@/lib/intelligence";
import RelatedContent, { infrastructureToRelatedItems } from "@/components/shared/RelatedContent";
import { getFeaturesNearCoordinate } from "@/adapters/usgs-moon";
import { buildQuickMapUrl } from "@/adapters/lroc";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return { title: "Region Not Found — Moonwatch" };
  return { title: `${region.name} — Moonwatch` };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) notFound();

  const missions = getRegionMissions(region.id);
  const regionInfra = getRegionInfrastructure(region.id);

  // Nearby lunar features from the gazetteer
  const nearbyFeatures = region.coordinates
    ? getFeaturesNearCoordinate(region.coordinates.lat, region.coordinates.lng, 10)
    : [];

  // LROC QuickMap link
  const quickMapUrl = region.coordinates
    ? buildQuickMapUrl(region.coordinates.lat, region.coordinates.lng)
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RegionDetail region={region} missions={missions} />

      {/* Nearby IAU features */}
      {nearbyFeatures.length > 0 && (
        <div className="border-t border-border/30 pt-8 mt-8">
          <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-dim mb-4 flex items-center gap-2">
            <span className="w-0.5 h-0.5 rounded-full bg-cold/40" />
            Nearby Lunar Features
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
            {nearbyFeatures.map((f) => (
              <div key={f.id} className="flex items-baseline justify-between py-1">
                <span className="text-[13px] font-light text-foreground">{f.name}</span>
                <span className="text-[10px] text-dim ml-2 capitalize">{f.featureType}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LROC QuickMap link */}
      {quickMapUrl && (
        <div className="border-t border-border/30 pt-8 mt-8">
          <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-dim mb-4 flex items-center gap-2">
            <span className="w-0.5 h-0.5 rounded-full bg-cold/40" />
            Observation Data
          </h2>
          <a
            href={quickMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-cold transition-colors"
          >
            View in LROC QuickMap
            <span className="text-dim">&rarr;</span>
          </a>
          <p className="mt-2 text-[11px] text-dim leading-relaxed max-w-md">
            High-resolution imagery from the Lunar Reconnaissance Orbiter Camera.
            Hosted by Arizona State University.
          </p>
        </div>
      )}

      {/* Related infrastructure */}
      {regionInfra.length > 0 && (
        <RelatedContent title="Infrastructure in This Region" items={infrastructureToRelatedItems(regionInfra)} />
      )}
    </div>
  );
}

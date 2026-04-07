import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegionBySlug } from "@/lib/data-access";
import { getRegionMissions } from "@/lib/relations";
import RegionDetail from "@/components/regions/RegionDetail";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return { title: "Region Not Found — Moonwatch" };
  return { title: `${region.name} — Moonwatch` };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const missions = getRegionMissions(region.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RegionDetail region={region} missions={missions} />
    </div>
  );
}

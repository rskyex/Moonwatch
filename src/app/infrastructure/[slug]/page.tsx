import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getInfrastructureBySlug,
  getAllRegions,
} from "@/lib/data-access";
import {
  getInfrastructureEntities,
  getInfrastructureMissions,
} from "@/lib/relations";
import InfrastructureDetail from "@/components/infrastructure/InfrastructureDetail";

interface InfrastructurePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: InfrastructurePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getInfrastructureBySlug(slug);
  if (!project) return { title: "Infrastructure Not Found — Moonwatch" };
  return { title: `${project.name} — Moonwatch` };
}

export default async function InfrastructurePage({
  params,
}: InfrastructurePageProps) {
  const { slug } = await params;
  const project = getInfrastructureBySlug(slug);

  if (!project) {
    notFound();
  }

  const entities = getInfrastructureEntities(project);
  const missions = getInfrastructureMissions(project);
  const region = project.regionId
    ? getAllRegions().find((r) => r.id === project.regionId)
    : undefined;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <InfrastructureDetail
      project={project}
      entities={entities}
      missions={missions}
      region={region}
    />
    </div>
  );
}

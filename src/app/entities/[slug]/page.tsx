import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntityBySlug, getUpdatesByEntity } from "@/lib/data-access";
import {
  getEntityMissions,
  getEntityInfrastructure,
} from "@/lib/relations";
import EntityDetail from "@/components/entities/EntityDetail";

interface EntityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EntityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntityBySlug(slug);
  if (!entity) return { title: "Entity Not Found — Moonwatch" };
  return { title: `${entity.name} — Moonwatch` };
}

export default async function EntityPage({ params }: EntityPageProps) {
  const { slug } = await params;
  const entity = getEntityBySlug(slug);

  if (!entity) {
    notFound();
  }

  const missions = getEntityMissions(entity.id);
  const infrastructure = getEntityInfrastructure(entity.id);
  const updates = getUpdatesByEntity(entity.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <EntityDetail
      entity={entity}
      missions={missions}
      infrastructure={infrastructure}
      updates={updates}
    />
    </div>
  );
}

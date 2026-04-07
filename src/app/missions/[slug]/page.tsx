import { notFound } from "next/navigation";
import { getMissionBySlug } from "@/lib/data-access";
import {
  getMissionEntities,
  getMissionRegion,
  getMissionInfrastructure,
  getMissionMilestones,
  getMissionUpdates,
} from "@/lib/relations";
import { MissionDetail } from "@/components/missions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);
  return {
    title: mission ? `${mission.name} — Moonwatch` : "Mission — Moonwatch",
  };
}

export default async function MissionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);

  if (!mission) {
    notFound();
  }

  const entities = getMissionEntities(mission);
  const region = getMissionRegion(mission);
  const infrastructure = getMissionInfrastructure(mission);
  const milestones = getMissionMilestones(mission.id);
  const updates = getMissionUpdates(mission.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MissionDetail
        mission={mission}
        entities={entities}
        updates={updates}
        infrastructure={infrastructure}
        milestones={milestones}
        region={region}
      />
    </div>
  );
}

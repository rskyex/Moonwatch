import Link from "next/link";
import { InfrastructureProject, Entity, Mission, LunarRegion } from "@/types";
import {
  getInfrastructureTypeLabel,
  getProjectStatusColor,
  getMissionStatusLabel,
  getMissionStatusColor,
} from "@/lib/formatting";
import { StatusBadge, TagChip } from "@/components/shared";

interface InfrastructureDetailProps {
  project: InfrastructureProject;
  entities: Entity[];
  missions: Mission[];
  region?: LunarRegion;
}

export default function InfrastructureDetail({
  project,
  entities,
  missions,
  region,
}: InfrastructureDetailProps) {
  return (
    <article>
      {/* Header */}
      <header className="border-b border-border pb-6 mb-8">
        <p className="text-xs text-muted font-medium uppercase tracking-wide">
          {getInfrastructureTypeLabel(project.type)}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {project.name}
        </h1>
        <div className="mt-3">
          <StatusBadge label={project.status} colorClass={getProjectStatusColor(project.status)} />
        </div>
      </header>

      {/* Description */}
      {project.description && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Description
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </section>
      )}

      {/* Entities */}
      {entities.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Entities
          </h2>
          <ul className="space-y-1.5">
            {entities.map((entity) => (
              <li key={entity.id}>
                <Link
                  href={`/entities/${entity.slug}`}
                  className="text-sm text-accent hover:underline"
                >
                  {entity.name}
                </Link>
              </li>
            ))}
          </ul>
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

      {/* Region */}
      {region && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Region
          </h2>
          <Link
            href={`/regions/${region.slug}`}
            className="text-sm text-accent hover:underline"
          >
            {region.name}
          </Link>
          {region.coordinates && (
            <p className="mt-1 text-xs text-muted">
              {region.coordinates.lat.toFixed(2)}° N, {region.coordinates.lng.toFixed(2)}° E
            </p>
          )}
        </section>
      )}

      {/* Tags */}
      {project.tags.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Tags
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

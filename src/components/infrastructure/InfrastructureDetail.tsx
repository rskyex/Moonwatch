import Link from "next/link";
import { InfrastructureProject, Entity, Mission, LunarRegion } from "@/types";
import {
  getInfrastructureTypeLabel,
  getProjectStatusColor,
  getMissionStatusLabel,
  getMissionStatusColor,
} from "@/lib/formatting";
import { StatusBadge, TagChip } from "@/components/shared";

const CATEGORY_LABELS: Record<string, string> = {
  "landing-systems": "Landing Systems",
  orbital: "Orbital Infrastructure",
  logistics: "Logistics & Transport",
  mobility: "Surface Mobility",
  communications: "Communications",
  navigation: "Navigation",
  habitation: "Habitation",
  power: "Power Systems",
  isru: "In-Situ Resource Utilization",
};

const MATURITY_LABELS: Record<string, string> = {
  conceptual: "Conceptual",
  prototype: "Prototype",
  "flight-proven": "Flight-Proven",
  "operational-heritage": "Operational Heritage",
};

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
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Description
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </section>
      )}

      {/* Why It Matters */}
      {project.whyItMatters && (
        <section className="mb-8">
          <div className="border border-border rounded-lg bg-accent-soft/30 p-5">
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-3">
              Why it matters
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              {project.whyItMatters}
            </p>
          </div>
        </section>
      )}

      {/* Technical Profile */}
      <section className="border-t border-border pt-8 mt-8">
        <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
          Technical Profile
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-[10px] font-medium tracking-wide uppercase text-muted mb-1">Type</p>
            <p className="text-sm text-foreground">{getInfrastructureTypeLabel(project.type)}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-wide uppercase text-muted mb-1">Status</p>
            <StatusBadge label={project.status} colorClass={getProjectStatusColor(project.status)} />
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-wide uppercase text-muted mb-1">Category</p>
            <p className="text-sm text-foreground">
              {project.category ? (CATEGORY_LABELS[project.category] ?? project.category) : "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-wide uppercase text-muted mb-1">Maturity</p>
            <p className="text-sm text-foreground">
              {project.maturity ? (MATURITY_LABELS[project.maturity] ?? project.maturity) : "—"}
            </p>
          </div>
        </div>
      </section>

      {/* Entities */}
      {entities.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Related Entities
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

      {/* Region */}
      {region && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
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
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Tags
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </section>
      )}

      {/* Source Trail */}
      {project.sources.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Source Trail
          </h2>
          <ul className="space-y-2">
            {project.sources.map((source, idx) => (
              <li key={`${source.sourceId}-${idx}`} className="text-sm">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline break-all"
                >
                  {source.url}
                </a>
                <span className="ml-2 text-xs text-muted">
                  accessed {new Date(source.accessedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

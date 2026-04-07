import Link from "next/link";
import type {
  Entity,
  Mission,
  InfrastructureProject,
  Update,
} from "@/types";
import { StatusBadge, TagChip, SectionHeading } from "@/components/shared";
import {
  getEntityTypeLabel,
  getMissionStatusLabel,
  getMissionStatusColor,
  getSignificanceLabel,
  getSignificanceColor,
  getInfrastructureTypeLabel,
  formatDate,
} from "@/lib/formatting";

interface EntityDetailProps {
  entity: Entity;
  missions: Mission[];
  infrastructure: InfrastructureProject[];
  updates: Update[];
}

export default function EntityDetail({
  entity,
  missions,
  infrastructure,
  updates,
}: EntityDetailProps) {
  const recentUpdates = updates.slice(0, 5);

  return (
    <article className="space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {entity.name}
          {entity.shortName && (
            <span className="ml-2 text-lg font-normal text-muted">
              ({entity.shortName})
            </span>
          )}
        </h1>
        <StatusBadge label={getEntityTypeLabel(entity.type)} />
      </header>

      {/* Description */}
      <section>
        <SectionHeading title="About" />
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {entity.description}
        </p>
      </section>

      {/* Details */}
      {(entity.country || entity.website) && (
        <section>
          <SectionHeading title="Details" />
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            {entity.country && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  Country
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {entity.country}
                </dd>
              </div>
            )}
            {entity.website && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  Website
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  <a
                    href={entity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {entity.website.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {/* Missions */}
      {missions.length > 0 && (
        <section>
          <SectionHeading title="Missions" />
          <ul className="mt-4 divide-y divide-border">
            {missions.map((mission) => (
              <li key={mission.id}>
                <Link
                  href={`/missions/${mission.slug}`}
                  className="flex items-center justify-between py-3 text-sm hover:bg-surface-alt transition rounded px-2 -mx-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {mission.name}
                    </span>
                    <StatusBadge
                      label={getMissionStatusLabel(mission.status)}
                      colorClass={getMissionStatusColor(mission.status)}
                    />
                  </div>
                  {mission.launchDate && (
                    <span className="text-xs text-muted">
                      {formatDate(mission.launchDate)}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Infrastructure */}
      {infrastructure.length > 0 && (
        <section>
          <SectionHeading title="Infrastructure" />
          <ul className="mt-4 divide-y divide-border">
            {infrastructure.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/infrastructure/${item.slug}`}
                  className="flex items-center justify-between py-3 text-sm hover:bg-surface-alt transition rounded px-2 -mx-2"
                >
                  <span className="font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="text-muted">
                    {getInfrastructureTypeLabel(item.type)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recent updates */}
      {recentUpdates.length > 0 && (
        <section>
          <SectionHeading title="Recent Updates" />
          <ul className="mt-4 space-y-3">
            {recentUpdates.map((update) => (
              <li
                key={update.id}
                className="flex items-start gap-3 rounded-md border border-border bg-surface p-4"
              >
                <StatusBadge
                  label={getSignificanceLabel(update.significance)}
                  colorClass={getSignificanceColor(update.significance)}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {update.title}
                  </p>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {update.summary}
                  </p>
                  <p className="mt-1.5 text-xs text-muted">
                    {formatDate(update.date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
      {entity.tags.length > 0 && (
        <section>
          <SectionHeading title="Tags" />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entity.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

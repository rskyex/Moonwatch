import Link from "next/link";
import type {
  Mission,
  Entity,
  Update,
  InfrastructureProject,
  Milestone,
  LunarRegion,
} from "@/types";
import { StatusBadge, TagChip, SectionHeading } from "@/components/shared";
import {
  getMissionStatusLabel,
  getMissionStatusColor,
  getSignificanceLabel,
  getSignificanceColor,
  getMilestoneStatusColor,
  getInfrastructureTypeLabel,
  formatDate,
} from "@/lib/formatting";

interface MissionDetailProps {
  mission: Mission;
  entities: Entity[];
  updates: Update[];
  infrastructure: InfrastructureProject[];
  milestones: Milestone[];
  region?: LunarRegion;
}

export default function MissionDetail({
  mission,
  entities,
  updates,
  infrastructure,
  milestones,
  region,
}: MissionDetailProps) {
  const recentUpdates = updates.slice(0, 5);

  return (
    <article className="space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {mission.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge
            label={getMissionStatusLabel(mission.status)}
            colorClass={getMissionStatusColor(mission.status)}
          />
          <StatusBadge label={mission.type.replace("-", " ")} />
        </div>
      </header>

      {/* Key facts */}
      <section>
        <SectionHeading title="Key Facts" />
        <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Status
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {getMissionStatusLabel(mission.status)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">Type</dt>
            <dd className="mt-1 text-sm font-medium text-foreground capitalize">
              {mission.type.replace("-", " ")}
            </dd>
          </div>
          {mission.launchDate && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Launch Date
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {formatDate(mission.launchDate)}
              </dd>
            </div>
          )}
          {mission.landingDate && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Landing Date
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {formatDate(mission.landingDate)}
              </dd>
            </div>
          )}
          {region && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Region
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {region.name}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* Description */}
      <section>
        <SectionHeading title="Description" />
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {mission.description}
        </p>
      </section>

      {/* Objectives */}
      {mission.objectives.length > 0 && (
        <section>
          <SectionHeading title="Objectives" />
          <ul className="mt-3 list-disc pl-5 space-y-1.5">
            {mission.objectives.map((obj, i) => (
              <li key={i} className="text-sm text-muted leading-relaxed">
                {obj}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related entities */}
      {entities.length > 0 && (
        <section>
          <SectionHeading title="Related Entities" />
          <ul className="mt-4 divide-y divide-border">
            {entities.map((entity) => (
              <li key={entity.id}>
                <Link
                  href={`/entities/${entity.slug}`}
                  className="flex items-center justify-between py-3 text-sm hover:bg-surface-alt transition rounded px-2 -mx-2"
                >
                  <div>
                    <span className="font-medium text-foreground">
                      {entity.name}
                    </span>
                    {entity.shortName && (
                      <span className="ml-1.5 text-muted">
                        ({entity.shortName})
                      </span>
                    )}
                  </div>
                  {entity.country && (
                    <span className="text-muted">{entity.country}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related infrastructure */}
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
                  <div>
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="ml-2 text-muted">
                      {getInfrastructureTypeLabel(item.type)}
                    </span>
                  </div>
                  <StatusBadge
                    label={item.status.replace("-", " ")}
                    colorClass={
                      item.status === "operational"
                        ? "text-green-600"
                        : "text-muted"
                    }
                  />
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

      {/* Milestones */}
      {milestones.length > 0 && (
        <section>
          <SectionHeading title="Milestones" />
          <ul className="mt-4 space-y-2">
            {milestones.map((ms) => (
              <li
                key={ms.id}
                className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <StatusBadge
                    label={ms.status}
                    colorClass={getMilestoneStatusColor(ms.status)}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {ms.title}
                  </span>
                </div>
                <span className="text-xs text-muted">
                  {formatDate(ms.date, ms.dateGranularity)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
      {mission.tags.length > 0 && (
        <section>
          <SectionHeading title="Tags" />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mission.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

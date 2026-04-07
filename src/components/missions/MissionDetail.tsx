import Link from "next/link";
import type {
  Mission,
  Entity,
  Update,
  InfrastructureProject,
  Milestone,
  LunarRegion,
} from "@/types";
import { StatusBadge, TagChip } from "@/components/shared";
import {
  getMissionStatusLabel,
  getMissionStatusColor,
  formatDate,
  getSignificanceLabel,
  getSignificanceColor,
  getInfrastructureTypeLabel,
  getEntityTypeLabel,
  getMilestoneStatusColor,
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
  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <article>
      {/* ---------------------------------------------------------------- */}
      {/* 1. Header                                                        */}
      {/* ---------------------------------------------------------------- */}
      <header className="space-y-3">
        {mission.program && (
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
            {mission.program}
          </p>
        )}
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {mission.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge
            label={getMissionStatusLabel(mission.status)}
            colorClass={getMissionStatusColor(mission.status)}
          />
          <StatusBadge label={mission.type.replace("-", " ")} />
        </div>
        {mission.strategicSignificance && mission.significanceCategory && (
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent">
            {mission.significanceCategory}
          </p>
        )}
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Strategic Significance                                        */}
      {/* ---------------------------------------------------------------- */}
      {mission.strategicSignificance && (
        <section className="border-t border-border pt-8 mt-8">
          <div className="rounded-md border border-border bg-accent-soft px-6 py-5">
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
              Why this mission matters
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              {mission.strategicSignificance}
            </p>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 3. Key Facts Grid                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-border pt-8 mt-8">
        <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
          Key Facts
        </h2>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
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
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Launch Date
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {mission.launchDate ? formatDate(mission.launchDate) : "TBD"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Landing Date
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {mission.landingDate
                ? formatDate(mission.landingDate)
                : "\u2014"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Region
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {region ? (
                <Link
                  href={`/regions/${region.slug}`}
                  className="text-accent hover:underline"
                >
                  {region.name}
                </Link>
              ) : (
                "\u2014"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Program
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {mission.program ?? "\u2014"}
            </dd>
          </div>
        </dl>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Overview                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-border pt-8 mt-8">
        <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
          Overview
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          {mission.description}
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Objectives                                                    */}
      {/* ---------------------------------------------------------------- */}
      {mission.objectives.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Objectives
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            {mission.objectives.map((obj, i) => (
              <li key={i} className="text-sm text-muted leading-relaxed">
                {obj}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 6. Related Entities                                              */}
      {/* ---------------------------------------------------------------- */}
      {entities.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Related Entities
          </h2>
          <ul className="divide-y divide-border">
            {entities.map((entity) => (
              <li key={entity.id}>
                <Link
                  href={`/entities/${entity.slug}`}
                  className="flex items-center justify-between py-3 text-sm hover:bg-surface-alt transition rounded px-2 -mx-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {entity.shortName ?? entity.name}
                    </span>
                    {entity.shortName && (
                      <span className="text-muted">{entity.name}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted">
                    {getEntityTypeLabel(entity.type)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 7. Infrastructure                                                */}
      {/* ---------------------------------------------------------------- */}
      {infrastructure.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Infrastructure
          </h2>
          <ul className="divide-y divide-border">
            {infrastructure.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/infrastructure/${item.slug}`}
                  className="flex items-center justify-between py-3 text-sm hover:bg-surface-alt transition rounded px-2 -mx-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted">
                      {getInfrastructureTypeLabel(item.type)}
                    </span>
                  </div>
                  <StatusBadge
                    label={item.status.replace("-", " ")}
                    colorClass={
                      item.status === "operational"
                        ? "text-green-600 bg-green-50"
                        : "text-muted"
                    }
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 8. Timeline / Milestones                                         */}
      {/* ---------------------------------------------------------------- */}
      {sortedMilestones.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Timeline
          </h2>
          <ul className="space-y-2">
            {sortedMilestones.map((ms) => (
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

      {/* ---------------------------------------------------------------- */}
      {/* 9. Recent Updates                                                */}
      {/* ---------------------------------------------------------------- */}
      {recentUpdates.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Recent Updates
          </h2>
          <ul className="space-y-3">
            {recentUpdates.map((update) => (
              <li
                key={update.id}
                className="rounded-md border border-border bg-surface p-4"
              >
                <div className="flex items-start gap-3">
                  <StatusBadge
                    label={getSignificanceLabel(update.significance)}
                    colorClass={getSignificanceColor(update.significance)}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted mb-1">
                      {formatDate(update.date)}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {update.title}
                    </p>
                    <p className="mt-1 text-sm text-muted line-clamp-2">
                      {update.summary}
                    </p>
                    {update.whyItMatters && (
                      <p className="mt-1.5 text-sm italic text-muted">
                        {update.whyItMatters}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 10. Source Trail                                                  */}
      {/* ---------------------------------------------------------------- */}
      {mission.sources.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Source trail
          </h2>
          <ul className="space-y-2">
            {mission.sources.map((src, i) => (
              <li
                key={i}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
              >
                <span className="font-mono text-xs text-muted">
                  {src.sourceId}
                </span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline break-all"
                >
                  {src.url}
                </a>
                <span className="text-xs text-muted">
                  accessed {formatDate(src.accessedAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 11. Tags                                                         */}
      {/* ---------------------------------------------------------------- */}
      {mission.tags.length > 0 && (
        <section className="border-t border-border pt-8 mt-8">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
            Tags
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {mission.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

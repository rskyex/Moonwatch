"use client";

import { useState, useMemo } from "react";
import MilestoneCard from "@/components/timeline/MilestoneCard";
import { Milestone, MilestoneStatus } from "@/types";

interface TimelinePageClientProps {
  milestones: Milestone[];
  missionNames: Record<string, string>;
  entityNames: Record<string, string>;
}

const THEMATIC_LABELS: Record<string, string> = {
  "artemis-program": "Artemis Program",
  "chang-e-program": "Chang'e Program",
  "commercial-lunar": "Commercial Lunar",
  "international-cooperation": "International Cooperation",
  "infrastructure": "Infrastructure",
};

function classifyHorizon(m: Milestone): "recent" | "upcoming" | "long-term" {
  if (m.horizon === "recent" || m.status === "achieved") return "recent";
  if (m.horizon === "upcoming" || m.status === "upcoming" || m.status === "delayed") return "upcoming";
  return "long-term";
}

const HORIZON_SECTIONS = [
  { key: "recent" as const, heading: "Recent Achievements" },
  { key: "upcoming" as const, heading: "Upcoming Milestones" },
  { key: "long-term" as const, heading: "Long-term Roadmap" },
];

const THEMATIC_OPTIONS = [
  { value: "all", label: "All" },
  { value: "artemis-program", label: "Artemis Program" },
  { value: "chang-e-program", label: "Chang'e Program" },
  { value: "commercial-lunar", label: "Commercial Lunar" },
  { value: "international-cooperation", label: "International Cooperation" },
  { value: "infrastructure", label: "Infrastructure" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "launch", label: "Launch" },
  { value: "landing", label: "Landing" },
  { value: "flyby", label: "Flyby" },
  { value: "docking", label: "Docking" },
  { value: "deployment", label: "Deployment" },
  { value: "sample-return", label: "Sample Return" },
  { value: "policy", label: "Policy" },
  { value: "other", label: "Other" },
];

const selectClass =
  "bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-foreground";

export default function TimelinePageClient({
  milestones,
  missionNames,
  entityNames,
}: TimelinePageClientProps) {
  const [horizonFilter, setHorizonFilter] = useState("all");
  const [thematicFilter, setThematicFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    return milestones.filter((m) => {
      if (horizonFilter !== "all" && classifyHorizon(m) !== horizonFilter) return false;
      if (thematicFilter !== "all" && m.thematicGroup !== thematicFilter) return false;
      if (typeFilter !== "all" && m.type !== typeFilter) return false;
      return true;
    });
  }, [milestones, horizonFilter, thematicFilter, typeFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [filtered]);

  const groups = useMemo(() => {
    const g: Record<string, Milestone[]> = {
      recent: [],
      upcoming: [],
      "long-term": [],
    };
    for (const m of sorted) {
      const horizon = classifyHorizon(m);
      g[horizon].push(m);
    }
    return g;
  }, [sorted]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          className={selectClass}
          value={horizonFilter}
          onChange={(e) => setHorizonFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="recent">Recent</option>
          <option value="upcoming">Upcoming</option>
          <option value="long-term">Long-term</option>
        </select>

        <select
          className={selectClass}
          value={thematicFilter}
          onChange={(e) => setThematicFilter(e.target.value)}
        >
          {THEMATIC_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="text-sm text-muted ml-auto">
          Showing {filtered.length} of {milestones.length} milestones
        </span>
      </div>

      <div className="space-y-2">
        {HORIZON_SECTIONS.map(({ key, heading }) => {
          const items = groups[key];
          if (!items || items.length === 0) return null;

          return (
            <section key={key}>
              <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4 mt-10">
                {heading}
              </h2>

              <div>
                {items.map((milestone) => (
                  <div key={milestone.id}>
                    {milestone.thematicGroup && (
                      <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-muted/60 bg-surface-alt rounded px-1.5 py-0.5 mb-1 ml-[8.75rem]">
                        {THEMATIC_LABELS[milestone.thematicGroup] ?? milestone.thematicGroup}
                      </span>
                    )}
                    <MilestoneCard
                      milestone={milestone}
                      missionNames={milestone.missionIds
                        .map((id) => missionNames[id])
                        .filter(Boolean)}
                      entityNames={milestone.entityIds
                        .map((id) => entityNames[id])
                        .filter(Boolean)}
                    />
                    {milestone.whyItMatters && (
                      <p className="text-xs text-muted/70 italic leading-relaxed ml-[8.75rem] -mt-4 mb-4 max-w-2xl">
                        {milestone.whyItMatters}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

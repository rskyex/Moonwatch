import type { Metadata } from "next";
import { getAllSources } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";

export const metadata: Metadata = {
  title: "Methodology — Moonwatch",
};

export default function MethodologyPage() {
  const sources = getAllSources();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Methodology"
        description="How Moonwatch sources, verifies, and curates lunar exploration data."
      />

      {/* Data Sources */}
      <section>
        <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
          Data Sources
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Type</th>
                <th className="py-2 pr-4 font-medium">Reliability</th>
                <th className="py-2 font-medium">URL</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr key={source.id} className="border-b border-border">
                  <td className="py-2 pr-4 font-medium text-foreground">
                    {source.name}
                  </td>
                  <td className="py-2 pr-4 text-muted-foreground capitalize">
                    {source.type.replace(/-/g, " ")}
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={
                        source.reliability === "primary"
                          ? "text-green-600"
                          : source.reliability === "secondary"
                            ? "text-amber-600"
                            : "text-red-600"
                      }
                    >
                      {source.reliability}
                    </span>
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate block max-w-xs"
                      >
                        {source.url}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Curation Standards */}
      <section className="border-t border-border pt-8">
        <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
          Curation Standards
        </h2>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            Every update on Moonwatch is linked to at least one mission or
            entity. Every claim includes a source reference with URL and access
            date.
          </p>
          <p>
            <strong className="text-foreground">Significance ratings</strong>{" "}
            classify the impact of each update:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Routine</strong> — Standard
              operational updates, scheduled maneuvers, or procedural
              milestones.
            </li>
            <li>
              <strong className="text-foreground">Notable</strong> — Updates
              that mark meaningful progress or attract wider attention.
            </li>
            <li>
              <strong className="text-foreground">Major</strong> — Significant
              achievements, setbacks, or policy shifts that reshape timelines or
              objectives.
            </li>
            <li>
              <strong className="text-foreground">Critical</strong> — Historic
              firsts, mission-defining events, or developments with broad
              geopolitical implications.
            </li>
          </ul>
          <p>
            <strong className="text-foreground">Reliability tiers</strong>{" "}
            indicate the trustworthiness of each source:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Primary</strong> — Official
              agency feeds, first-party press releases, and peer-reviewed
              publications.
            </li>
            <li>
              <strong className="text-foreground">Secondary</strong> —
              Reputable news outlets, established space-industry journalists,
              and verified reporting.
            </li>
            <li>
              <strong className="text-foreground">Unverified</strong> — Social
              media, forums, or sources that have not been independently
              corroborated.
            </li>
          </ul>
        </div>
      </section>

      {/* Data Model Transparency */}
      <section className="border-t border-border pt-8">
        <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
          Data Model Transparency
        </h2>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            Moonwatch tracks structured entities: Missions, Entities (agencies
            and companies), Infrastructure Projects, Milestones, and Lunar
            Regions. All data points are cross-referenced and interconnected.
          </p>
        </div>
      </section>

      {/* Future Integration */}
      <section className="border-t border-border pt-8">
        <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
          Future Integration
        </h2>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            Moonwatch is designed to integrate data from NASA RSS feeds, ESA
            newsroom, JAXA updates, ISRO releases, and commercial lunar company
            announcements. All future integrations will flow through a
            normalization pipeline that preserves source attribution.
          </p>
        </div>
      </section>
    </div>
  );
}

import type { LunarStateDisplay } from "@/lib/live-data";

interface HeroSectionProps {
  lunarState: LunarStateDisplay;
  activeMissions: number;
  totalMissions: number;
}

export default function HeroSection({ lunarState, activeMissions, totalMissions }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center">
      {/* Deep void atmospheric layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Lunar body glow — large soft sphere in upper area */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 40vw at 50% 30%, rgba(56,189,248,0.03) 0%, rgba(56,189,248,0.01) 40%, transparent 70%)",
          }}
        />
        {/* Horizon line glow at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(56,189,248,0.04) 0%, transparent 15%)",
          }}
        />
        {/* Grid — very faint mission grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(var(--cold) 1px, transparent 1px), linear-gradient(90deg, var(--cold) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative">
        {/* System status */}
        <div className="flex items-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-nominal animate-pulse" />
          <span className="text-[9px] tracking-[0.5em] uppercase text-nominal/60 font-mono">
            Systems Nominal
          </span>
        </div>

        {/* Title — monumental */}
        <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-extralight tracking-[-0.05em] text-foreground leading-[0.85] font-sans">
          MOON<span className="text-cold">WATCH</span>
        </h1>

        {/* ── Lunar Telemetry — the centerpiece ── */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 border border-cold/10 rounded-sm bg-surface/60 max-w-3xl">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3 bg-cold/30 rounded-[1px]" />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-cold/60">
                Lunar Telemetry
              </span>
            </div>
            <span className="text-[8px] font-mono text-dim tracking-wider">
              LIVE
            </span>
          </div>

          {/* Primary readouts — big numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div>
              <p className="text-[8px] font-mono tracking-[0.3em] uppercase text-cold/40 mb-1">
                Earth-Moon Distance
              </p>
              <p className="text-2xl sm:text-3xl font-sans font-extralight text-foreground tabular-nums tracking-tight">
                {lunarState.distance}
              </p>
            </div>
            <div>
              <p className="text-[8px] font-mono tracking-[0.3em] uppercase text-cold/40 mb-1">
                Lunar Phase
              </p>
              <p className="text-2xl sm:text-3xl font-sans font-extralight text-cold/90 tracking-tight">
                {lunarState.phaseName}
              </p>
            </div>
            <div>
              <p className="text-[8px] font-mono tracking-[0.3em] uppercase text-cold/40 mb-1">
                Phase Angle
              </p>
              <p className="text-2xl sm:text-3xl font-sans font-extralight text-foreground tabular-nums tracking-tight">
                {lunarState.phaseAngle}
              </p>
            </div>
          </div>

          {/* Secondary readouts — smaller telemetry line */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-border/50">
            <TelemetryValue label="Sub-Solar Lng" value={lunarState.subSolarLng} />
            <TelemetryValue label="Libration Lat" value={lunarState.librationLat} />
            <TelemetryValue label="Libration Lng" value={lunarState.librationLng} />
            <span className="hidden sm:inline w-px h-4 bg-border self-center" />
            <TelemetryValue label="Active Missions" value={String(activeMissions)} highlight />
            <TelemetryValue label="Tracked" value={String(totalMissions)} />
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-10 border-l border-dim/30 pl-4 max-w-md">
          <p className="text-[12px] text-dim leading-[1.9]">
            Lunar exploration observatory. Missions, infrastructure,
            and milestones — sourced and structurally connected.
          </p>
        </div>
      </div>
    </section>
  );
}

function TelemetryValue({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-dim">
        {label}
      </span>
      <span className={`text-[12px] font-mono tabular-nums ${highlight ? "text-nominal" : "text-muted"}`}>
        {value}
      </span>
    </div>
  );
}

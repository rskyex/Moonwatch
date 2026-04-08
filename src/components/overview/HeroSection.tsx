import type { LunarStateDisplay } from "@/lib/live-data";

interface HeroSectionProps {
  lunarState: LunarStateDisplay;
  activeMissions: number;
  totalMissions: number;
}

export default function HeroSection({ lunarState, activeMissions, totalMissions }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center py-16">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Large lunar presence — soft orb */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, rgba(34,211,238,0.015) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative">
        {/* System status line */}
        <div className="flex items-center gap-2.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-nominal shadow-[0_0_8px_rgba(52,211,153,0.4)] animate-pulse" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-nominal/80 font-mono">
            Systems Nominal
          </span>
          <span className="ml-4 text-[10px] text-dim font-mono">
            {new Date().toISOString().split("T")[0]}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[0.9]">
          <span className="text-foreground">MOON</span>
          <span className="text-cold">WATCH</span>
        </h1>
        <p className="mt-4 text-[15px] text-muted max-w-md leading-relaxed">
          Lunar exploration observatory. Missions, infrastructure,
          and milestones — sourced and structurally connected.
        </p>

        {/* ── Telemetry Panel — translucent floating layer ── */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-lg border border-border bg-surface backdrop-blur-xl max-w-4xl shadow-[0_0_40px_rgba(34,211,238,0.03)]">
          {/* Panel header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-4 rounded-full bg-cold/40" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-cold/80">
                Lunar Telemetry
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cold/40 animate-pulse" />
              <span className="text-[10px] font-mono text-cold/50">LIVE</span>
            </div>
          </div>

          {/* Primary readouts — large clear numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <TelemetryBlock label="Earth — Moon" value={lunarState.distance} />
            <TelemetryBlock label="Phase" value={lunarState.phaseName} accent />
            <TelemetryBlock label="Phase Angle" value={lunarState.phaseAngle} />
          </div>

          {/* Secondary readouts */}
          <div className="mt-8 pt-6 border-t border-border/60 grid grid-cols-2 sm:grid-cols-5 gap-4">
            <TelemetrySmall label="Sub-Solar" value={lunarState.subSolarLng} />
            <TelemetrySmall label="Lib. Lat" value={lunarState.librationLat} />
            <TelemetrySmall label="Lib. Lng" value={lunarState.librationLng} />
            <TelemetrySmall label="Active" value={String(activeMissions)} highlight />
            <TelemetrySmall label="Tracked" value={`${totalMissions} missions`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TelemetryBlock({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-dim mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-light tracking-tight tabular-nums ${accent ? "text-cold" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function TelemetrySmall({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-dim/80 mb-0.5">{label}</p>
      <p className={`text-sm font-mono tabular-nums ${highlight ? "text-nominal" : "text-foreground/80"}`}>{value}</p>
    </div>
  );
}

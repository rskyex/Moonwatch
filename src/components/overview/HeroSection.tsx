import type { LunarStateDisplay } from "@/lib/live-data";

interface HeroSectionProps {
  lunarState: LunarStateDisplay;
  activeMissions: number;
  totalMissions: number;
}

export default function HeroSection({ lunarState, activeMissions, totalMissions }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center py-16 overflow-hidden">

      {/* ── Celestial bodies ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">

        {/* The Moon — large luminous sphere, top right */}
        <div
          className="absolute -top-[5%] -right-[10%] sm:right-[5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #e8e8ec 0%, #c0c0c8 20%, #808088 45%, #404048 70%, #1a1a20 90%)",
            boxShadow: "0 0 80px rgba(200,200,220,0.15), 0 0 200px rgba(200,200,220,0.05), inset -20px -20px 60px rgba(0,0,0,0.6)",
            opacity: 0.9,
          }}
        >
          {/* Crater texture hints */}
          <div className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle at 60% 40%, transparent 40%, rgba(0,0,0,0.3) 42%, transparent 44%), radial-gradient(circle at 30% 60%, transparent 30%, rgba(0,0,0,0.2) 32%, transparent 34%), radial-gradient(circle at 70% 70%, transparent 25%, rgba(0,0,0,0.25) 27%, transparent 29%)",
            }}
          />
        </div>

        {/* Earth — small blue marble, bottom left, far away */}
        <div
          className="absolute bottom-[15%] left-[8%] w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 40%, #4fa8d4 0%, #2070a0 30%, #103860 60%, #081828 80%)",
            boxShadow: "0 0 20px rgba(79,168,212,0.3), 0 0 60px rgba(79,168,212,0.1)",
          }}
        />

        {/* Atmospheric haze at horizon */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[30vh]"
          style={{
            background: "linear-gradient(to top, rgba(6,8,12,0.95) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* Status */}
        <div className="flex items-center gap-2.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-nominal shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-nominal font-mono font-medium">
            Systems Nominal
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9]">
          <span className="text-white">MOON</span>
          <span className="text-cold">WATCH</span>
        </h1>
        <p className="mt-5 text-[16px] text-muted max-w-lg leading-relaxed">
          Lunar exploration observatory. Tracking every mission, every system,
          every milestone in humanity&apos;s return to the Moon.
        </p>

        {/* ── Telemetry Panel ── */}
        <div className="mt-14 sm:mt-20 p-6 sm:p-8 rounded-lg border border-cold/20 bg-surface max-w-4xl shadow-[0_0_60px_rgba(34,211,238,0.06)]">
          {/* Panel header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 rounded-full bg-cold/50" />
              <span className="text-[12px] font-mono tracking-[0.2em] uppercase text-cold font-medium">
                Lunar Telemetry
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cold/50 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
              <span className="text-[11px] font-mono text-cold/80 font-medium">LIVE</span>
            </div>
          </div>

          {/* Primary readouts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <TelemetryBlock label="Earth — Moon" value={lunarState.distance} />
            <TelemetryBlock label="Phase" value={lunarState.phaseName} accent />
            <TelemetryBlock label="Phase Angle" value={lunarState.phaseAngle} />
          </div>

          {/* Secondary readouts */}
          <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 sm:grid-cols-5 gap-4">
            <TelemetrySmall label="Sub-Solar" value={lunarState.subSolarLng} />
            <TelemetrySmall label="Lib. Lat" value={lunarState.librationLat} />
            <TelemetrySmall label="Lib. Lng" value={lunarState.librationLng} />
            <TelemetrySmall label="Active" value={String(activeMissions)} highlight />
            <TelemetrySmall label="Total" value={`${totalMissions} missions`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TelemetryBlock({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-bold tracking-tight tabular-nums ${accent ? "text-cold" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function TelemetrySmall({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted mb-1">{label}</p>
      <p className={`text-[14px] font-mono tabular-nums font-medium ${highlight ? "text-nominal" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end pb-12 sm:pb-20">
      {/* Atmospheric layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Horizon glow — cold telemetry light from the lunar limb */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 140% 30% at 50% 105%, rgba(56,189,248,0.08) 0%, transparent 60%)",
          }}
        />
        {/* Grid overlay — mission operations feel */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(var(--cold) 1px, transparent 1px), linear-gradient(90deg, var(--cold) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative">
        {/* System designation */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-nominal animate-pulse" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-cold/70 font-mono">
            Systems Nominal
          </span>
        </div>

        {/* Title — mission display scale */}
        <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-extralight tracking-[-0.04em] text-foreground leading-[0.88] font-sans">
          MOON<span className="text-cold/80">WATCH</span>
        </h1>

        {/* Subtitle — telemetry readout style */}
        <div className="mt-8 sm:mt-12 border-l border-cold/20 pl-4">
          <p className="text-[13px] text-muted leading-[1.8]">
            Tracking every mission to the Moon.
            <br />
            Infrastructure, actors, and milestones —
            <br className="hidden sm:block" />
            sourced and structurally connected.
          </p>
        </div>

        {/* Telemetry bar */}
        <div className="mt-12 sm:mt-20 flex items-center gap-4 text-[9px] font-mono text-dim tracking-wider">
          <span className="text-cold/40">DST</span>
          <span className="text-muted tabular-nums">384,400 km</span>
          <span className="w-8 h-px bg-cold/15" />
          <span className="text-cold/40">LAT</span>
          <span className="text-muted tabular-nums">&minus;89.9&deg;</span>
          <span className="w-8 h-px bg-cold/15" />
          <span className="text-cold/40">STATUS</span>
          <span className="text-nominal/70">OPERATIONAL</span>
        </div>
      </div>
    </section>
  );
}

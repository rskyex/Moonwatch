export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-end pb-16 sm:pb-24">
      {/* Atmospheric layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Horizon glow — cold light rising from below */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 40% at 50% 100%, var(--glow) 0%, transparent 70%)",
          }}
        />
        {/* Upper void fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 40%)",
          }}
        />
      </div>

      <div className="relative">
        {/* Classification marker */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="w-1 h-1 rounded-full bg-cold/40" />
          <span className="text-[9px] tracking-[0.5em] uppercase text-dim font-medium">
            Lunar Exploration Observatory
          </span>
        </div>

        {/* Title — monumental scale */}
        <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-extralight tracking-[-0.04em] text-foreground leading-[0.88]">
          Moon<span className="font-light">watch</span>
        </h1>

        {/* Deck — quiet, expansive */}
        <p className="mt-8 sm:mt-12 text-[15px] sm:text-[17px] text-muted font-light leading-[1.7] max-w-md">
          Tracking every mission to the Moon.
          <br />
          Infrastructure, actors, and milestones —
          <br className="hidden sm:block" />
          sourced and structurally connected.
        </p>

        {/* Horizon line — the frontier boundary */}
        <div className="mt-16 sm:mt-24 flex items-center">
          <div className="h-px flex-1 max-w-xs" style={{
            background: "linear-gradient(to right, var(--cold), transparent)",
            opacity: 0.15,
          }} />
          <span className="ml-4 text-[8px] tracking-[0.6em] uppercase text-dim/60 font-mono">
            384,400 km
          </span>
        </div>
      </div>
    </section>
  );
}

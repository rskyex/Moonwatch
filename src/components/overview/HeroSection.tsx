export default function HeroSection() {
  return (
    <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32">
      {/* Atmospheric gradient — lunar horizon */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% -10%, var(--glow) 0%, transparent 60%)",
        }}
      />

      <div className="relative">
        {/* Title — large, quiet, authoritative */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.03em] text-foreground leading-[0.95]">
          Moon
          <span className="font-normal">watch</span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted font-light leading-relaxed max-w-lg">
          A structured observatory for lunar exploration.
          <br className="hidden sm:block" />
          Missions, infrastructure, and milestones — sourced and connected.
        </p>

        {/* Horizon rule */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <div className="h-px w-16 bg-dim/40" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-dim font-medium">
            384,400 km
          </span>
        </div>
      </div>
    </section>
  );
}

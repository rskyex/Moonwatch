import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border pb-16 mb-12">
      {/* Subtle radial glow — horizon effect */}
      <div
        className="pointer-events-none absolute inset-0 -top-24"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, var(--glow) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl pt-4">
        {/* Eyebrow */}
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-6">
          Lunar Exploration Observatory
        </p>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
          {siteConfig.siteName}
        </h1>

        {/* Tagline — the emotional line */}
        <p className="mt-5 text-lg sm:text-xl text-accent font-medium leading-relaxed">
          {siteConfig.tagline}
        </p>

        {/* Description */}
        <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
          A structured reference for every mission, entity, and milestone
          in humanity&apos;s return to the lunar surface. Sourced, connected,
          and continuously updated.
        </p>

        {/* Horizon line — subtle decorative element */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted/60 font-medium">
            384,400 km
          </span>
          <div className="h-px w-12 bg-accent/10" />
        </div>
      </div>
    </section>
  );
}

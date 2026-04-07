import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section className="border-b border-border pb-10 mb-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {siteConfig.siteName}
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-accent font-medium leading-snug">
          {siteConfig.tagline}
        </p>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          {siteConfig.siteDescription}. A curated, structured reference for
          every mission, entity, and milestone in humanity&apos;s return to the
          lunar surface.
        </p>
      </div>
    </section>
  );
}

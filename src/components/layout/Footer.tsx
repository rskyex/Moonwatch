import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-accent/50" />
              <p className="text-sm font-medium">{siteConfig.siteName}</p>
            </div>
            <p className="text-xs text-muted mt-2 max-w-xs leading-relaxed">
              {siteConfig.siteDescription}. Sourced from public agency feeds
              and curated records.
            </p>
          </div>
          <div className="text-[11px] text-muted/70 text-right leading-relaxed">
            <p>Not affiliated with any space agency.</p>
            <p className="mt-1">
              Data provenance documented on the{" "}
              <a href="/methodology" className="text-accent/70 hover:text-accent transition-colors">
                Methodology
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

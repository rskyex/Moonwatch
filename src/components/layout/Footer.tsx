import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-medium">{siteConfig.siteName}</p>
            <p className="text-xs text-muted mt-1">{siteConfig.siteDescription}</p>
          </div>
          <div className="text-xs text-muted">
            <p>Data sourced from public agency feeds and curated records.</p>
            <p className="mt-1">Not affiliated with any space agency.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

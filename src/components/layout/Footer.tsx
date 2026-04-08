import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div>
              <p className="text-[13px] font-medium text-foreground">Moonwatch</p>
              <p className="text-[11px] text-dim mt-1.5 max-w-xs leading-relaxed">
                A structured observatory for lunar exploration.
                Sourced from public agency feeds and curated records.
              </p>
            </div>
            <div className="text-[11px] text-dim leading-relaxed sm:text-right">
              <p>Not affiliated with any space agency.</p>
              <Link href="/methodology" className="text-muted hover:text-foreground transition-colors">
                Methodology &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border/40 pt-10">
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-cold/30" />
                <span className="text-[13px] font-semibold text-foreground">
                  Moonwatch
                </span>
              </div>
              <p className="text-[12px] text-dim max-w-sm leading-relaxed">
                Structured observatory for lunar exploration.
                Sourced from public agency feeds and curated records.
              </p>
            </div>
            <div className="text-[11px] text-dim leading-relaxed sm:text-right">
              <p>Not affiliated with any space agency.</p>
              <Link href="/methodology" className="text-cold/60 hover:text-cold transition-colors">
                Methodology &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

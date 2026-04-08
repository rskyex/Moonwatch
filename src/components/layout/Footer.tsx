import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Terminal-style separator */}
        <div className="h-px w-full bg-border mb-8" />

        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-1 rounded-full bg-nominal/40" />
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-cold/50">
                Moonwatch
              </span>
            </div>
            <p className="text-[10px] font-mono text-dim max-w-sm leading-relaxed">
              Structured observatory for lunar exploration.
              Sourced from public agency feeds and curated records.
            </p>
          </div>
          <div className="text-[9px] font-mono text-dim leading-relaxed sm:text-right tracking-wide">
            <p>Not affiliated with any space agency.</p>
            <Link href="/methodology" className="text-cold/40 hover:text-cold/70">
              Methodology &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Horizon line */}
        <div className="h-px w-full mb-10" style={{
          background: "linear-gradient(to right, transparent, var(--cold), transparent)",
          opacity: 0.08,
        }} />

        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="text-[12px] font-medium text-muted tracking-wide">Moonwatch</p>
            <p className="text-[11px] text-dim mt-2 max-w-sm leading-relaxed">
              Structured observatory for lunar exploration.
              Sourced from public agency feeds and curated records.
            </p>
          </div>
          <div className="text-[10px] text-dim leading-relaxed sm:text-right">
            <p>Not affiliated with any space agency.</p>
            <Link href="/methodology" className="text-muted hover:text-foreground">
              Methodology &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

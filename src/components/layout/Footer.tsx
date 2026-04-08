import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border pt-10">
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-cold/40" />
                <span className="text-[14px] font-bold text-white">Moonwatch</span>
              </div>
              <p className="text-[13px] text-muted max-w-sm leading-relaxed">
                Structured observatory for lunar exploration.
                Sourced from public agency feeds and curated records.
              </p>
            </div>
            <div className="text-[12px] text-muted leading-relaxed sm:text-right">
              <p>Not affiliated with any space agency.</p>
              <Link href="/methodology" className="text-cold/70 hover:text-cold transition-colors font-medium">
                Methodology &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

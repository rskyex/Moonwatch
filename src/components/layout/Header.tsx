"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nominal/60" />
            <span className="text-[11px] font-mono font-medium tracking-[0.1em] uppercase text-cold/80">
              Moonwatch
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-px">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 text-[10px] font-mono tracking-[0.1em] uppercase border-b ${
                    isActive
                      ? "text-cold border-cold/40"
                      : "text-dim border-transparent hover:text-muted hover:border-border"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-dim hover:text-muted"
            aria-label="Menu"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden py-2 border-t border-border space-y-0.5">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider ${
                    isActive ? "text-cold" : "text-dim hover:text-muted"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

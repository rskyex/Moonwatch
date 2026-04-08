"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-11 items-center justify-between border-b border-border/40">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-1 h-1 rounded-full bg-cold/50" />
            <span className="text-[12px] font-medium tracking-[0.05em] text-foreground">
              Moonwatch
            </span>
          </Link>

          <nav className="hidden md:flex items-center">
            {navigation.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 text-[11px] tracking-wide ${
                    isActive ? "text-foreground" : "text-dim hover:text-muted"
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
          <nav className="md:hidden py-3 space-y-1">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-1 py-1.5 text-[12px] ${
                    isActive ? "text-foreground" : "text-dim hover:text-muted"
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, siteConfig } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border/60 bg-background/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[13px] font-medium tracking-tight text-foreground">
              {siteConfig.siteName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1 text-[12px] transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-foreground"
            aria-label="Toggle menu"
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
          <nav className="md:hidden pb-3 pt-1 border-t border-border/40">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-2 py-1.5 text-[13px] ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
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

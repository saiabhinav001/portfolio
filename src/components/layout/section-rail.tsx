"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navItems } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Fixed editorial index rail (desktop only). Tracks the section in view with
 * an IntersectionObserver and lets the reader jump between them.
 */
export function SectionRail() {
  const [active, setActive] = useState<string>(navItems[0].href.split("#")[1]);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.split("#")[1]);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="fixed left-[max(1.5rem,calc((100vw-82rem)/2+1.5rem))] top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1 2xl:flex"
    >
      {navItems.map((item) => {
        const isActive = active === item.href.split("#")[1];
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 py-1"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={cn(
                "h-px transition-all duration-500 ease-editorial",
                isActive ? "w-7 bg-accent" : "w-3.5 bg-line group-hover:w-5 group-hover:bg-faint",
              )}
            />
            <span
              className={cn(
                "font-mono text-[0.62rem] uppercase tracking-label transition-all duration-300",
                isActive
                  ? "text-ink opacity-100"
                  : "translate-x-1 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

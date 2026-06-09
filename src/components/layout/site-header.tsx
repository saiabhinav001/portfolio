"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { navItems, profile } from "@/content/site";
import { cn } from "@/lib/utils";
import { ResumeLink } from "@/components/primitives/resume-link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-500",
          scrolled || open
            ? "border-line bg-paper/80 backdrop-blur-md supports-[backdrop-filter]:bg-paper/65"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-14 items-center justify-between gap-6 sm:h-16">
          <Link href="/#top" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
            <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-md border border-ink/15 font-mono text-[0.7rem] font-medium text-ink transition-colors group-hover:border-accent group-hover:text-accent">
              {profile.initials}
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-sm font-medium tracking-tight text-ink">{profile.shortName}</span>
              <span className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-label text-faint">{profile.title}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Section navigation">
            {navItems.slice(1, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ResumeLink className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-300 hover:text-ink md:inline-flex">
              <FileText size={14} strokeWidth={1.75} />
              Resume
            </ResumeLink>
            <Link
              href="/#contact"
              className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent sm:inline-flex"
            >
              Get in touch
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-4 bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-px w-4 bg-current transition-all duration-300",
                    open ? "-rotate-45" : "translate-y-1",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden"
          >
            <div className="border-b border-line bg-paper/95 backdrop-blur-xl">
              <nav className="shell flex flex-col py-6" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-baseline justify-between border-b border-line/70 py-4 last:border-0"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-accent-strong">{item.index}</span>
                      <span className="text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight size={18} strokeWidth={1.5} className="text-faint transition-colors group-hover:text-accent" />
                  </motion.a>
                ))}
                <ResumeLink
                  onClick={() => setOpen(false)}
                  className="group mt-5 flex items-center justify-between gap-3 rounded-full bg-ink px-5 py-3.5 text-paper"
                >
                  <span className="flex items-center gap-2 text-base font-medium">
                    <FileText size={16} strokeWidth={1.75} />
                    Resume
                  </span>
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </ResumeLink>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

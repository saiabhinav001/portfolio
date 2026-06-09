"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { hero, profile } from "@/content/site";
import { revealUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ResumeLink } from "@/components/primitives/resume-link";

export function Hero() {
  const reduce = useReducedMotion();
  const container = reduce ? undefined : stagger;
  const item = reduce ? undefined : revealUp;

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col">
      {/* subtle focal glow — a whisper of accent, not a SaaS gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: "radial-gradient(55% 50% at 50% -8%, rgb(var(--accent) / 0.05), transparent 72%)" }}
      />

      <div className="shell relative flex flex-1 flex-col justify-center pb-12 pt-28 lg:pt-24">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12"
        >
          {/* Main column */}
          <div className="lg:col-span-8">
            <motion.div variants={item} className="flex items-center gap-3">
              <AvailabilityDot />
              <span className="label text-faint">{hero.kicker}</span>
            </motion.div>

            {/* Static (not animated-in): this is the LCP element — painting it
                immediately keeps LCP fast. The rest of the hero still reveals. */}
            <h1 className="mt-6 max-w-[18ch] text-balance font-sans text-hero font-medium text-ink">
              {hero.statement.map((seg, i) =>
                "accent" in seg && seg.accent ? (
                  <span key={i} className="text-accent-strong">
                    {seg.text}
                  </span>
                ) : (
                  <span key={i}>{seg.text}</span>
                ),
              )}
            </h1>

            <motion.div variants={item} className="mt-8 flex flex-col gap-1.5">
              <p className="text-lg font-medium tracking-tight text-ink sm:text-xl">{profile.name}</p>
              <p className="font-mono text-sm text-muted">
                {profile.title} <span className="text-faint">·</span> {profile.role}
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                View selected work
                <ArrowDown size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>
              <ResumeLink className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent">
                <FileText size={15} strokeWidth={1.75} />
                Resume
              </ResumeLink>
              <Link href="/#contact" className="link-underline text-sm font-medium text-ink">
                Get in touch
                <ArrowUpRight size={15} strokeWidth={1.75} className="ml-1" />
              </Link>
            </motion.div>

            {/* Mobile-only availability + eligibility (spec card is desktop-only) */}
            <motion.div variants={item} className="mt-8 lg:hidden">
              <div className="flex flex-col gap-2 rounded-xl border border-line bg-surface/60 p-4">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <AvailabilityDot />
                  {profile.status}
                </span>
                <p className="font-mono text-xs text-muted">
                  {profile.eligibility} <span className="text-faint">·</span> {profile.location}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Spec panel — reads like a technical spec sheet */}
          <motion.div variants={item} className="hidden lg:col-span-4 lg:block">
            <div className="ml-auto max-w-xs rounded-xl border border-line bg-surface p-5 shadow-card">
              <SpecRow k="Status" v={profile.status} accent />
              <SpecRow k="Eligibility" v={profile.eligibility} />
              <SpecRow k="Based in" v={profile.location} />
              <SpecRow k="Timezone" v={profile.timezone} />
              <div className="my-4 h-px bg-line" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <SpecLink href={profile.resume} label="Resume" emphasis />
                <SpecLink href={profile.links.github} label="GitHub" />
                <SpecLink href={profile.links.linkedin} label="LinkedIn" />
                <SpecLink href={profile.links.leetcode} label="LeetCode" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Signals band */}
        <motion.dl
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line shadow-card sm:grid-cols-3 lg:mt-14"
        >
          {hero.signals.map((s) => (
            <motion.div
              variants={item}
              key={s.label}
              className="flex items-baseline justify-between gap-3 bg-surface px-5 py-4 sm:flex-col sm:items-start sm:justify-start sm:px-6 sm:py-5"
            >
              <dt className="font-mono text-base font-medium tabular-nums tracking-tight text-ink sm:text-xl lg:text-2xl">
                {s.value}
              </dt>
              <dd className="text-right text-xs text-muted sm:mt-1.5 sm:text-left sm:text-sm">{s.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

function SpecRow({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="label text-faint">{k}</span>
      <span className={cn("flex items-center gap-2 text-right text-sm", accent ? "text-ink" : "text-muted")}>
        {accent ? <AvailabilityDot /> : null}
        {v}
      </span>
    </div>
  );
}

function SpecLink({ href, label, emphasis = false }: { href: string | null; label: string; emphasis?: boolean }) {
  const className = cn(
    "link-underline font-mono text-xs",
    emphasis ? "font-medium text-ink" : "text-muted",
    href ? "hover:text-accent" : "cursor-not-allowed opacity-50",
  );

  if (!href) {
    return (
      <span className={className} aria-disabled="true" title={`${label} — coming soon`}>
        {label}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {label}
    </a>
  );
}

function AvailabilityDot() {
  const reduce = useReducedMotion();
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {!reduce ? (
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-accent"
          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

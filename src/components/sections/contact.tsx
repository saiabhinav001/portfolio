"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { profile, sections } from "@/content/site";
import { Reveal } from "@/components/primitives/reveal";
import { ResumeLink } from "@/components/primitives/resume-link";
import { cn } from "@/lib/utils";

const channels = [
  { label: "Email", value: profile.email, href: profile.links.email, external: false },
  { label: "GitHub", value: "github.com/saiabhinav001", href: profile.links.github, external: true },
  { label: "LinkedIn", value: "in/sai-abhinav-sadineni", href: profile.links.linkedin, external: true },
  { label: "LeetCode", value: "u/abhinav_111", href: profile.links.leetcode, external: true },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link remains the fallback */
    }
  };

  return (
    <section id="contact" className="py-section">
      <div className="shell">
        <div className="flex items-center gap-4 text-faint">
          <span className="font-mono text-sm tabular-nums text-accent-strong">{sections.contact.index}</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
          <span className="label">{sections.contact.kicker}</span>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="max-w-xl text-balance font-sans text-headline font-medium text-ink">
              {sections.contact.title}
            </h2>
            <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-muted">
              I&apos;m looking for 2026 internships and new-grad roles in AI, software, search, or cloud
              <span className="text-ink"> (graduating 2027)</span>. Email is the best way to reach me.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={profile.links.email}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                {profile.email}
                <ArrowUpRight size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-3 text-sm text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                aria-label="Copy email address"
              >
                {copied ? <Check size={15} strokeWidth={1.75} /> : <Copy size={15} strokeWidth={1.75} />}
                {copied ? "Copied" : "Copy"}
              </button>
              <ResumeLink className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-3 text-sm text-muted transition-colors duration-300 hover:border-accent hover:text-accent">
                <FileText size={15} strokeWidth={1.75} />
                Resume
              </ResumeLink>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <ul className="overflow-hidden rounded-xl border border-line">
              {channels.map((c, i) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noreferrer" : undefined}
                    className={cn(
                      "group flex items-center justify-between gap-4 bg-surface px-6 py-5 transition-colors duration-300 hover:bg-inset",
                      i !== 0 && "border-t border-line",
                    )}
                  >
                    <span className="flex flex-col">
                      <span className="label text-faint">{c.label}</span>
                      <span className="mt-1.5 font-mono text-sm text-ink">{c.value}</span>
                    </span>
                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.5}
                      className="shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

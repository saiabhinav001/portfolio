import Link from "next/link";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import type { CaseStudy } from "@/content/site";

export function ProjectCard({ study }: { study: CaseStudy }) {
  const repo = study.links.find((l) => l.kind === "code");
  const demo = study.links.find((l) => l.kind === "demo");
  const href = `/projects/${study.slug}`;

  return (
    // `isolate` scopes the z-index; the title link's ::before stretches over the
    // whole card so the entire surface is clickable, while the external links
    // (which sit at z-10) stay independently clickable.
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 shadow-card transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover focus-within:border-accent/50 sm:p-7">
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-faint">
        <span className="flex items-center gap-3">
          <span className="text-accent-strong">{study.index}</span>
          <span className="text-muted">{study.category}</span>
        </span>
        <span>{study.year}</span>
      </div>

      <h3 className="mt-5 text-pretty text-xl font-medium tracking-tight text-ink sm:text-2xl">
        <Link
          href={href}
          className="rounded-sm outline-offset-4 transition-colors duration-300 before:absolute before:inset-0 before:content-[''] group-hover:text-accent-strong"
        >
          {study.title}
        </Link>
      </h3>

      {study.award ? (
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-label text-accent-strong">{study.award}</p>
      ) : null}

      <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted">{study.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {study.cardTags.map((t) => (
          <li key={t} className="rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-[0.7rem] text-muted">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-line pt-5">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
          View Architecture
          <ArrowUpRight size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>

        {/* z-10 keeps these above the stretched title link so they remain clickable */}
        <div className="relative z-10 flex items-center gap-2">
          {demo ? (
            <a
              href={demo.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${study.title} — live demo`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <ArrowUpRight size={13} strokeWidth={1.75} />
              Live
            </a>
          ) : null}
          {repo ? (
            <a
              href={repo.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${study.title} — source on GitHub`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Github size={13} strokeWidth={1.75} />
              GitHub
            </a>
          ) : (
            <span
              title="Not open-sourced"
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-3 py-2 text-xs font-medium text-faint"
            >
              <Lock size={12} strokeWidth={1.75} />
              Private repo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

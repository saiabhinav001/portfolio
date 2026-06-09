import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Trophy } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { AgenticDiagram } from "@/components/diagrams/agentic-diagram";
import { RetrievalDiagram } from "@/components/diagrams/retrieval-diagram";
import { TenancyDiagram } from "@/components/diagrams/tenancy-diagram";
import { PipelineDiagram } from "@/components/diagrams/pipeline-diagram";
import { MobileArchitecture } from "@/components/diagrams/mobile-architecture";

const diagrams = {
  agentic: AgenticDiagram,
  retrieval: RetrievalDiagram,
  tenancy: TenancyDiagram,
  pipeline: PipelineDiagram,
} as const;

export function ProjectDetail({ study }: { study: CaseStudy }) {
  const Diagram = diagrams[study.diagram];
  const idx = caseStudies.findIndex((s) => s.slug === study.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article className="pb-section pt-20 sm:pt-24 lg:pt-32">
      <div className="shell">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-faint transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            All work
          </Link>
        </Reveal>

        {/* Header — static (the title is the LCP element; paint it immediately).
            Achievement leads, then title, summary, links. */}
        <div className="mt-6 sm:mt-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-faint">
            <span className="text-accent-strong">{study.index}</span>
            <span className="text-muted">{study.category}</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span>{study.year}</span>
          </div>

          {study.award ? (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5">
              <Trophy size={13} strokeWidth={1.75} className="text-accent-strong" />
              <span className="text-xs font-medium text-accent-strong">{study.award}</span>
            </span>
          ) : null}

          <h1 className="mt-4 max-w-3xl text-balance font-sans text-[1.75rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-headline">
            {study.title}
          </h1>
          <p className="mt-3 max-w-prose text-pretty text-lede text-muted">{study.tagline}</p>

          {study.links.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {study.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                    l.kind === "demo"
                      ? "border-ink/15 text-ink hover:border-accent hover:text-accent"
                      : "border-line text-muted hover:border-accent hover:text-accent",
                  )}
                >
                  {l.label}
                  <ArrowUpRight size={14} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Impact — outcomes up front. */}
        <Reveal className="mt-10 sm:mt-14">
          <h2 className="label text-faint">Impact</h2>
          <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line shadow-card sm:grid-cols-3">
            {study.outcomes.map((o) => (
              <div key={o.label} className="bg-surface px-5 py-5 sm:px-6">
                <p className="font-mono text-xl font-medium tracking-tight text-ink">{o.value}</p>
                <p className="mt-1.5 text-sm text-muted">{o.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Technology — grouped: core, infrastructure, AI/ML. */}
        <Reveal className="mt-10 sm:mt-12">
          <h2 className="label text-faint">Technology</h2>
          <div className="mt-4 flex flex-col gap-4">
            {(
              [
                ["Core", study.stackGroups.core],
                ["Infrastructure", study.stackGroups.infra],
                ["AI / ML", study.stackGroups.ai],
              ] as const
            ).map(([groupLabel, items]) =>
              items.length > 0 ? (
                <div key={groupLabel}>
                  <span className="font-mono text-[0.6rem] uppercase tracking-label text-faint">{groupLabel}</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {items.map((t) => (
                      <span key={t} className="rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[0.72rem] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </Reveal>

        {/* Key decisions */}
        <Reveal className="mt-10 sm:mt-14">
          <h2 className="label text-faint">Key decisions</h2>
          <ol className="mt-4 flex flex-col">
            {study.decisions.map((d, i) => (
              <li key={d.title} className="border-t border-line py-4 first:border-t-0 first:pt-0">
                <div className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[0.95rem] font-medium text-ink">{d.title}</h3>
                    <p className="mt-1.5 max-w-prose text-pretty text-sm leading-relaxed text-muted">{d.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Architecture — the deep dive, supporting the story. Diagram sits left on
            desktop; on phones the text leads and a native layout replaces the SVG. */}
        <div className="mt-10 sm:mt-14">
          <Reveal>
            <h2 className="label text-faint">Architecture</h2>
          </Reveal>
          <div className="mt-4 grid gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <Reveal>
                <div className="sm:hidden">
                  <MobileArchitecture stages={study.archStages} />
                </div>
                <div className="hidden sm:block lg:sticky lg:top-24">
                  <Diagram />
                </div>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <Reveal group className="flex flex-col gap-8">
                <RevealItem>
                  <NarrativeBlock label="The problem" body={study.problem} />
                </RevealItem>
                <RevealItem>
                  <NarrativeBlock label="How it works" body={study.approach} />
                </RevealItem>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Next + CTA */}
        <Reveal className="mt-14 border-t border-line pt-8 sm:mt-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="label text-faint">Next project</span>
              <Link
                href={`/projects/${next.slug}`}
                className="mt-2 block max-w-md text-pretty text-xl font-medium tracking-tight text-ink transition-colors hover:text-accent sm:text-2xl"
              >
                {next.title}
              </Link>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowUpRight size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function NarrativeBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h3 className="label text-faint">{label}</h3>
      <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-ink/85">{body}</p>
    </div>
  );
}

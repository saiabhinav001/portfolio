import { about, education, sections } from "@/content/site";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";

export function About() {
  return (
    <section id="about" className="py-section">
      <div className="shell">
        <SectionHeading index={sections.about.index} kicker={sections.about.kicker} title={sections.about.title} />

        <Reveal className="mt-10 max-w-prose">
          <p className="text-pretty text-lede leading-relaxed text-ink/90">{about.body}</p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="label text-faint">Education</span>
              <span className="text-sm font-medium text-ink">{education.school}</span>
              <span className="text-sm text-muted">{education.degree}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
              <span className="text-ink">{education.graduation}</span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span>{education.eligibility}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

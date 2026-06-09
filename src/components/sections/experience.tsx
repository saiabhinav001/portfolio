import { experience, sections } from "@/content/site";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";

export function Experience() {
  return (
    <section id="experience" className="py-section">
      <div className="shell">
        <SectionHeading
          index={sections.experience.index}
          kicker={sections.experience.kicker}
          title={sections.experience.title}
        />

        <Reveal group className="mt-8 sm:mt-12 lg:mt-14 flex flex-col">
          {experience.map((role) => (
            <RevealItem
              key={role.org}
              className="group grid gap-6 border-t border-line py-9 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 font-mono text-xs text-faint">
                  <span>{role.period}</span>
                  <span className="h-3 w-px bg-line" />
                  <span>{role.mode}</span>
                </div>
                <h3 className="mt-3 text-xl font-medium tracking-tight text-ink">{role.org}</h3>
                <p className="mt-1.5 text-sm text-accent-strong">{role.role}</p>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-prose text-pretty text-base leading-relaxed text-ink/85">{role.summary}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent/70" />
                      <span className="max-w-prose text-pretty">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import { recognition, sections } from "@/content/site";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";

export function Recognition() {
  return (
    <section id="recognition" className="py-section">
      <div className="shell">
        <SectionHeading
          index={sections.recognition.index}
          kicker={sections.recognition.kicker}
          title={sections.recognition.title}
        />

        <Reveal group className="mt-8 sm:mt-12 lg:mt-14 flex flex-col">
          {recognition.awards.map((award, i) => (
            <RevealItem
              key={award.title}
              className="group grid gap-4 border-t border-line py-7 lg:grid-cols-12 lg:gap-8"
            >
              <div className="flex items-baseline gap-4 lg:col-span-1">
                <span className="font-mono text-sm text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-lg font-medium tracking-tight text-ink">{award.title}</h3>
                <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-muted">{award.detail}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <span className="label text-faint">{award.org}</span>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex items-center gap-3">
            <span className="label text-faint">Certifications</span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <Reveal group className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {recognition.certifications.map((cert) => (
            <RevealItem key={cert.code} className="bg-paper p-5">
              <p className="text-sm font-medium leading-snug text-ink">{cert.name}</p>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-label text-faint">{cert.code}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

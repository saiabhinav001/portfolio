import { expertise, sections } from "@/content/site";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";

export function Expertise() {
  return (
    <section id="expertise" className="py-section">
      <div className="shell">
        <SectionHeading
          index={sections.expertise.index}
          kicker={sections.expertise.kicker}
          title={sections.expertise.title}
        />

        <Reveal group className="mt-8 sm:mt-12 lg:mt-14 flex flex-col">
          {expertise.groups.map((group, i) => (
            <RevealItem
              key={group.title}
              className="grid gap-4 border-t border-line py-7 lg:grid-cols-12 lg:gap-8"
            >
              <div className="flex items-baseline gap-3 lg:col-span-4">
                <span className="font-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-base font-medium tracking-tight text-ink">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 lg:col-span-8">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="label text-faint">Languages</span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-ink">
              {expertise.languages.map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

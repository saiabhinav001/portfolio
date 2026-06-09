import { caseStudies, sections } from "@/content/site";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal, RevealItem } from "@/components/primitives/reveal";
import { ProjectCard } from "./project-card";

export function Work() {
  return (
    <section id="work" className="py-section">
      <div className="shell">
        <SectionHeading
          index={sections.work.index}
          kicker={sections.work.kicker}
          title={sections.work.title}
          description={sections.work.description}
        />

        <Reveal group className="mt-6 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14">
          {caseStudies.map((study) => (
            <RevealItem key={study.slug} className="h-full">
              <ProjectCard study={study} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

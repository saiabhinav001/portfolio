import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, meta } from "@/content/site";
import { ProjectDetail } from "@/components/sections/project-detail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  const path = `/projects/${study.slug}`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${study.title} — ${meta.title}`,
      description: study.summary,
      url: `${meta.url}${path}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return <ProjectDetail study={study} />;
}

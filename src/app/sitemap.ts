import type { MetadataRoute } from "next";
import { meta, caseStudies } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: meta.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((study) => ({
      url: `${meta.url}/projects/${study.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}

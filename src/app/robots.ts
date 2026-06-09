import type { MetadataRoute } from "next";
import { meta } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${meta.url}/sitemap.xml`,
    host: meta.url,
  };
}

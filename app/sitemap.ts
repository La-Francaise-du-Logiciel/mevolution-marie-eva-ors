import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const PATHS = ["/", "/prestations", "/a-propos", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { localizedPath } from "@/lib/seo";

const PATHS = ["/", "/prestations", "/a-propos", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const lastModified = new Date();

  return PATHS.map((path) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = site + localizedPath(path, locale);
    }

    return {
      url: site + localizedPath(path, routing.defaultLocale),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    };
  });
}

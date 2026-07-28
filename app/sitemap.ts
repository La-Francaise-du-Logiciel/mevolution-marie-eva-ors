import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * `lastModified` portait la date du build : toutes les URLs paraissaient
 * modifiées à chaque déploiement, ce qui dévalue le signal (audit §8.8).
 * On déclare donc une date de dernière révision éditoriale, par route.
 */
const CONTENT_REVISION = "2026-07-28";

const PAGES = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/coaching", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/bilan-de-competences", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_REVISION);

  return PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

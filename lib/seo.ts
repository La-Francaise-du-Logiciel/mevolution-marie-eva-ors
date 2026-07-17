import type { Metadata } from "next";

import { getSiteUrl } from "./site";

/** Chemin absolu du site (français uniquement, sans préfixe de locale). */
export function absoluteUrl(path: string): string {
  return getSiteUrl() + (path === "/" ? "" : path);
}

type BuildMetadataArgs = {
  path: string;
  title: string;
  description: string;
  /** Titre déjà complet (ne pas appliquer le template « … · Mévolution »). */
  absoluteTitle?: boolean;
};

/**
 * Métadonnées par page : title/description, canonical, Open Graph et Twitter.
 * L'image OG est fournie par app/opengraph-image.
 */
export function buildPageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      title,
      description,
    },
  };
}

import type { Metadata } from "next";

import { routing, type Locale } from "@/i18n/routing";
import { getSiteUrl } from "./site";

/** Chemin absolu localisé : ("/prestations", "fr") → "/fr/prestations". */
export function localizedPath(path: string, locale: string): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

type BuildMetadataArgs = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Titre déjà complet (ne pas appliquer le template « … · Mévolution »). */
  absoluteTitle?: boolean;
};

/**
 * Métadonnées par page : title/description, canonical, hreflang (FR/EN + x-default),
 * Open Graph et Twitter. L'image OG est fournie par app/[locale]/opengraph-image.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: BuildMetadataArgs): Metadata {
  const site = getSiteUrl();
  const url = site + localizedPath(path, locale);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = site + localizedPath(path, l);
  }
  languages["x-default"] = site + localizedPath(path, routing.defaultLocale);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      locale: OG_LOCALE[locale],
      type: "website",
    },
    twitter: {
      title,
      description,
    },
  };
}

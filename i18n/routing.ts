import { defineRouting } from "next-intl/routing";

/**
 * Routing i18n : préfixe de locale toujours présent (/fr/…, /en/…), défaut FR.
 * Les slugs restent stables entre les langues (cf. handoff : /prestations, /a-propos, /contact).
 */
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

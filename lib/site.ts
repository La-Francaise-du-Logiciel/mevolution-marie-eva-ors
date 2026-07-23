/**
 * Constantes globales du site (coordonnées, liens, réseaux).
 * Source unique de vérité — réutilisée par le header, footer, contact, SEO, JSON-LD.
 */
export const siteConfig = {
  name: "Mévolution — Consulting & Coaching",
  shortName: "Mévolution",
  founder: "Maréva Ors",
  /** Lien Calendly de l'entretien découverte (ouvrir dans un nouvel onglet). */
  calendlyUrl: "https://calendly.com/orsmareva/entretien-decouverte-gratuit-30min",
  email: "mevolution-consulting@outlook.fr",
  phoneDisplay: "+33 6 74 08 18 11",
  phoneHref: "tel:+33674081811",
  phoneE164: "+33674081811",
  social: {
    linkedin: "https://www.linkedin.com/in/orsmareva",
    instagram: "https://www.instagram.com/orsmareva",
    facebook: "#",
  },
} as const;

/** URL de production (sans slash final). Configurable via NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

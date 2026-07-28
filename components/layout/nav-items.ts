/**
 * Éléments de navigation partagés (header, footer, menu mobile).
 * Module neutre (pas de "use client") pour être importable
 * depuis des composants serveur comme client.
 *
 * `key`    : libellé complet — footer et menu mobile (ancrage interne riche pour le SEO).
 * `navKey` : libellé court — header desktop, où la place est comptée.
 */
export const NAV = [
  { href: "/", key: "home", navKey: "home" },
  { href: "/coaching", key: "coaching", navKey: "coachingShort" },
  { href: "/bilan-de-competences", key: "bilanCompetences", navKey: "bilanShort" },
  { href: "/contact", key: "contact", navKey: "contact" },
] as const;

export type NavItem = (typeof NAV)[number];

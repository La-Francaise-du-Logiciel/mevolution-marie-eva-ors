/**
 * Éléments de navigation partagés (header, footer, menu mobile).
 * Module neutre (pas de "use client") pour être importable
 * depuis des composants serveur comme client.
 */
export const NAV = [
  { href: "/", key: "home" },
  { href: "/prestations", key: "prestations" },
  { href: "/a-propos", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export type NavItem = (typeof NAV)[number];

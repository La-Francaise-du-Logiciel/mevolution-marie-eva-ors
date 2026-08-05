/**
 * Constantes globales du site (coordonnées, liens, réseaux, zone d'intervention).
 * Source unique de vérité, réutilisée par le header, footer, contact, SEO, JSON-LD.
 *
 * ⚠️ RÈGLE : tout ce qui n'est pas confirmé par la cliente vaut `null`.
 * Les composants n'affichent que ce qui est renseigné : on n'invente jamais
 * une certification, un chiffre ou un tarif (risque juridique + perte de crédibilité).
 */
export const siteConfig = {
  name: "Mévolution Consulting & Coaching",
  shortName: "Mévolution",
  founder: "Maréva Ors",
  /**
   * Lien Calendly de l'entretien découverte (ouvrir dans un nouvel onglet).
   *
   * ⚠️ ACTION REQUISE CÔTÉ CLIENTE : le site annonce désormais un entretien
   * d'1 heure, mais cet événement Calendly est encore configuré sur 30 min
   * (cf. le slug `…-30min`). Il faut passer la durée à 60 min dans Calendly ;
   * l'URL changera alors et devra être reportée ici. Tant que ce n'est pas fait,
   * le visiteur réserve un créneau de 30 min après avoir lu « 1 heure ».
   */
  calendlyUrl: "https://calendly.com/orsmareva/entretien-decouverte-gratuit-30min",
  email: "mevolution-consulting@outlook.fr",
  phoneDisplay: "+33 6 74 08 18 11",
  phoneHref: "tel:+33674081811",
  phoneE164: "+33674081811",
  social: {
    linkedin: "https://www.linkedin.com/in/orsmareva",
    instagram: "https://www.instagram.com/orsmareva",
    /**
     * `null` = le lien n'est pas affiché (footer et page Contact).
     * Le « é » est encodé en %C3%A9 : une URL doit être en ASCII pour être
     * transmise telle quelle par tous les clients et outils d'analyse.
     */
    facebook: "https://www.facebook.com/p/M%C3%A9volution-61578683169872/" as string | null,
  },
} as const;

/**
 * Créateurs du site : affichés dans le footer et les mentions légales.
 * ⚠️ À faire valider : noms/contacts exacts à confirmer par l'équipe.
 */
export const siteCredits = {
  name: "La Française du Logiciel",
  url: "https://francaisedulogiciel.fr",
  email: "contact@francaisedulogiciel.fr",
} as const;

/**
 * Entretien découverte : durée unique, référencée partout (copie, FAQ, JSON-LD, OG).
 * Modifier ici met à jour l'ensemble du site.
 */
export const discoveryCall = {
  durationMinutes: 60,
  /** Libellé court, utilisé dans les CTA et les cartes. */
  durationLabel: "1 h",
  /** Libellé long, utilisé dans les phrases rédigées. */
  durationLabelLong: "1 heure",
  free: true,
} as const;

/**
 * Zone d'intervention : moteur du SEO local.
 * `primary` sert aux titles/H1, `cities` alimente `areaServed` dans le JSON-LD.
 */
export const serviceArea = {
  primary: ["Strasbourg", "Haguenau", "Saverne"],
  region: "Bas-Rhin",
  regionLarge: "Alsace",
  administrativeArea: "Grand Est",
  country: "FR",
  countryName: "France",
  /** Communes couvertes (JSON-LD `areaServed`). */
  cities: [
    "Strasbourg",
    "Haguenau",
    "Saverne",
    "Brumath",
    "Bischwiller",
    "Molsheim",
    "Obernai",
    "Schiltigheim",
  ],
} as const;

/**
 * Certifications et informations légales.
 * ⚠️ À `null` tant que la cliente ne les a pas confirmées par écrit.
 * Renseigner une valeur suffit à l'afficher (bandeau de confiance, mentions légales, JSON-LD).
 */
export const credentials = {
  /** Ex. "Certifié Qualiopi, action de bilan de compétences". */
  qualiopi: null as string | null,
  /** Numéro SIRET (obligatoire dans les mentions légales). */
  siret: null as string | null,
  /** Numéro de déclaration d'activité (organisme de formation). */
  nda: null as string | null,
  /** Forme juridique, ex. "Entreprise individuelle". */
  legalForm: null as string | null,
  /** Assureur RC professionnelle. */
  insurance: null as string | null,
  /** Adresse postale du siège (mentions légales). */
  postalAddress: null as string | null,
  /** Partenariat déjà revendiqué sur le site actuel. */
  partner: "Orientaction",
  /** Le bilan de compétences est mobilisable via le CPF (partenariat Orientaction). */
  cpfEligible: true,
} as const;

/**
 * Chiffres clés affichés sous le hero.
 * ⚠️ `null` = non affiché. N'inscrire QUE des chiffres vérifiables et documentés :
 * un chiffre inventé est une pratique commerciale trompeuse.
 */
export const keyFigures = {
  /** Nombre de personnes accompagnées. */
  peopleSupported: null as number | null,
  /** Année de début d'activité (permet de calculer l'ancienneté). */
  since: null as number | null,
  /** Note moyenne Google. ⚠️ À confirmer : la moyenne réelle des 16 avis Google n'est pas connue. */
  rating: null as number | null,
  /**
   * Volume d'avis publiés, affiché sous la forme « Plus de {reviewCount} ».
   * 16 avis sur la fiche Google + 5 avis transmis directement (absents de Google) = 21.
   * On annonce donc « plus de 20 », formulation prudente et vérifiable.
   */
  reviewCount: 20,
} as const;

/**
 * Photos du site (sources carrées 2048×2048, recadrées en 4:5 par le composant `Photo`).
 *
 * `mareva-ors-debout.jpg` reste disponible dans `public/photos/` mais n'est plus
 * utilisée depuis la suppression de la page « À propos » : aucun emplacement ne la porte.
 *
 * Le recadrage `object-cover` ne rogne que les bords latéraux (~10 % de chaque côté) :
 * le cadrage vertical du visage est intégralement conservé sur les trois clichés.
 *
 * Une valeur à `null` fait retomber `Photo` sur le cadre de marque, sans image cassée.
 */
export const photos = {
  /** Portrait principal : hero de l'accueil (LCP, préchargé). */
  heroPortrait: "/photos/mareva-ors-portrait.jpg",
  /** Portrait assis : section « À propos » de l'accueil. */
  aboutPortrait: "/photos/mareva-ors-assise.jpg",
  /** Vignette 420×420 inlinée dans les images Open Graph générées (voir `lib/og.tsx`). */
  openGraph: "/photos/og-portrait.jpg",
} as const;

/** URL de production (sans slash final). Configurable via NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

/**
 * Garde-fou de build (audit P0 #1).
 *
 * En production, un `NEXT_PUBLIC_SITE_URL` absent fait pointer TOUS les canonicals,
 * l'Open Graph et le sitemap vers `localhost:3000` : invisibilité SEO totale, sans
 * aucun signe visible sur le site. On échoue donc au build, avec le message qui va bien.
 *
 * Échappatoire volontaire pour un build de test local : `ALLOW_MISSING_SITE_URL=1`.
 */
if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.ALLOW_MISSING_SITE_URL !== "1"
) {
  throw new Error(
    "[Mévolution] NEXT_PUBLIC_SITE_URL est manquant.\n" +
      "Sans lui, les canonicals, l'Open Graph et le sitemap pointeraient vers localhost:3000.\n" +
      "→ Renseignez la variable d'environnement avant de builder (voir .env.example).\n" +
      "→ Pour un build de test local uniquement : ALLOW_MISSING_SITE_URL=1 npm run build"
  );
}

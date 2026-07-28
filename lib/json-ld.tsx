import { credentials, discoveryCall, getSiteUrl, serviceArea, siteConfig } from "./site";
import { absoluteUrl } from "./seo";

/** Rend un bloc JSON-LD (données structurées) de façon sûre. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Zone d'intervention pour le SEO local (audit §8.2).
 * `areaServed` valait « France » : beaucoup trop large pour ressortir sur les
 * requêtes locales, qui sont les plus qualifiées de ce marché.
 */
function areaServed() {
  return [
    ...serviceArea.cities.map((name) => ({ "@type": "City", name })),
    { "@type": "AdministrativeArea", name: serviceArea.region },
    { "@type": "AdministrativeArea", name: serviceArea.administrativeArea },
    { "@type": "Country", name: serviceArea.countryName },
  ];
}

export function organizationSchema(description: string) {
  const site = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${site}/`,
    logo: `${site}/assets/logo-dark.svg`,
    image: `${site}/assets/logo-dark.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phoneE164,
    description,
    priceRange: "€€",
    founder: { "@type": "Person", "@id": `${site}/#person`, name: siteConfig.founder },
    // Pas d'adresse postale publiée : on déclare la région servie, jamais une
    // adresse supposée (`credentials.postalAddress` reste à confirmer par la cliente).
    address: {
      "@type": "PostalAddress",
      addressRegion: serviceArea.administrativeArea,
      addressCountry: serviceArea.country,
    },
    areaServed: areaServed(),
    availableLanguage: ["fr"],
    knowsAbout: [
      "Coaching emploi",
      "Bilan de compétences",
      "Reconversion professionnelle",
      "Évolution professionnelle",
      "Recherche d'emploi",
    ],
    ...(credentials.qualiopi ? { hasCredential: credentials.qualiopi } : {}),
    ...(credentials.siret ? { taxID: credentials.siret } : {}),
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ].filter((url): url is string => Boolean(url)),
  };
}

export function personSchema(opts: {
  name: string;
  jobTitle: string;
  description: string;
  /** Page qui porte la fiche (par défaut l'ancre « à propos » de l'accueil). */
  path?: string;
}) {
  const site = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site}/#person`,
    name: opts.name,
    jobTitle: opts.jobTitle,
    description: opts.description,
    url: opts.path ? absoluteUrl(opts.path) : `${site}/#a-propos`,
    worksFor: { "@id": `${site}/#organization` },
    areaServed: areaServed(),
    knowsAbout: [
      "Coaching emploi",
      "Bilan de compétences",
      "Reconversion professionnelle",
      "Insertion professionnelle",
    ],
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
  };
}

/**
 * Fiche d'un accompagnement (audit §8.6) — absente jusqu'ici, alors que ce sont
 * les deux pages qui portent les requêtes commerciales du site.
 */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  const site = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: absoluteUrl(opts.path),
    provider: { "@id": `${site}/#organization` },
    areaServed: areaServed(),
    availableChannel: [
      {
        "@type": "ServiceChannel",
        serviceLocation: {
          "@type": "Place",
          name: serviceArea.primary.join(", "),
          address: {
            "@type": "PostalAddress",
            addressRegion: serviceArea.administrativeArea,
            addressCountry: serviceArea.country,
          },
        },
      },
      {
        "@type": "ServiceChannel",
        name: "À distance (téléphone, visioconférence)",
        serviceUrl: siteConfig.calendlyUrl,
      },
    ],
    // Seul prix réellement public : l'entretien découverte, à 0 €. Les tarifs des
    // accompagnements ne sont pas déclarés tant qu'ils ne sont pas publiés sur le site.
    offers: {
      "@type": "Offer",
      name: `Entretien découverte de ${discoveryCall.durationLabelLong}`,
      description: `Premier entretien de ${discoveryCall.durationLabelLong}, gratuit et sans engagement.`,
      price: 0,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: siteConfig.calendlyUrl,
    },
  };
}

/**
 * Avis clients affichés sur l'accueil (audit §7.1).
 *
 * On déclare les avis réellement publiés, un par un. Pas d'`aggregateRating` :
 * la moyenne réelle de l'ensemble des avis Google n'est pas connue, et un
 * agrégat approximatif est à la fois un risque de pénalité et une allégation
 * commerciale non vérifiable. À ajouter dès que la note Google sera confirmée.
 */
export function reviewsSchema(
  items: { quote: string; author: string; rating: number; date: string }[]
) {
  const site = getSiteUrl();

  return items.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": `${site}/#organization` },
    reviewBody: item.quote,
    author: { "@type": "Person", name: item.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: item.rating,
      bestRating: 5,
      worstRating: 1,
    },
  }));
}

export function webSiteSchema() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site}/#website`,
    name: siteConfig.name,
    url: `${site}/`,
    inLanguage: "fr",
    publisher: { "@id": `${site}/#organization` },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

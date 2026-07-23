import { getSiteUrl, siteConfig } from "./site";
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
    founder: { "@type": "Person", name: siteConfig.founder },
    areaServed: { "@type": "Country", name: "France" },
    availableLanguage: ["fr"],
    knowsAbout: [
      "Coaching emploi",
      "Bilan de compétences",
      "Reconversion professionnelle",
      "Évolution professionnelle",
    ],
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
  };
}

export function personSchema(opts: { name: string; jobTitle: string; description: string }) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    description: opts.description,
    url: `${site}/#a-propos`,
    worksFor: { "@id": `${site}/#organization` },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
  };
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

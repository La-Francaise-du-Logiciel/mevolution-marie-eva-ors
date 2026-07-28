import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/json-ld";
import { CrossLink } from "@/components/brand/cross-link";
import { CoachingHero } from "@/components/sections/coaching/hero";
import { Promesses, Phases, Modalites, Histoire } from "@/components/sections/coaching/content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("coaching.meta");
  return buildPageMetadata({
    path: "/coaching",
    title: t("title"),
    description: t("description"),
  });
}

/** Questions de la FAQ d'accueil qui concernent directement le coaching emploi. */
const COACHING_FAQ_INDEXES = [0, 1, 4, 6, 7, 8, 10];

export default async function CoachingPage() {
  const t = await getTranslations("coaching");
  const nav = await getTranslations("nav");
  const faq = await getTranslations("home.faq");
  const allFaq = faq.raw("items") as { q: string; a: string }[];
  const pageFaq = COACHING_FAQ_INDEXES.map((index) => allFaq[index]).filter(Boolean);

  return (
    <>
      <CoachingHero />
      <Promesses />
      <Phases />

      <Modalites />
      <Histoire />
      <CrossLink
        title={t("crossLink.title")}
        text={t("crossLink.text")}
        link={t("crossLink.link")}
        href="/bilan-de-competences"
      />

      <JsonLd
        data={serviceSchema({
          name: "Coaching emploi",
          description: t("meta.description"),
          path: "/coaching",
          serviceType: "Coaching emploi et accompagnement à la recherche d'emploi",
        })}
      />
      <JsonLd data={faqSchema(pageFaq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: nav("coaching"), path: "/coaching" },
        ])}
      />
    </>
  );
}

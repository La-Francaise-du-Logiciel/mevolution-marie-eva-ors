import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/json-ld";
import { CtaBand } from "@/components/brand/cta-band";
import { BilanHero } from "@/components/sections/bilan/hero";
import { Pourquoi, Citation, Pratique, Confidentialite } from "@/components/sections/bilan/content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("bilan.meta");
  return buildPageMetadata({
    path: "/bilan-de-competences",
    title: t("title"),
    description: t("description"),
  });
}

/** Questions de la FAQ d'accueil qui concernent directement le bilan de compétences. */
const BILAN_FAQ_INDEXES = [0, 2, 3, 4, 5, 6, 8, 11];

export default async function BilanPage() {
  const t = await getTranslations("bilan");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const faq = await getTranslations("home.faq");
  const allFaq = faq.raw("items") as { q: string; a: string }[];
  const pageFaq = BILAN_FAQ_INDEXES.map((index) => allFaq[index]).filter(Boolean);

  return (
    <>
      <BilanHero />
      <Pourquoi />
      <Pratique />
      <Confidentialite />
      <Citation />
      <CtaBand
        title={t("ctaBand.title")}
        text={t("ctaBand.text")}
        ctaLabel={common("ctaBook")}
        ctaAria={common("ctaAria")}
        location="bilan-band"
      />

      <JsonLd
        data={serviceSchema({
          name: "Bilan de compétences",
          description: t("meta.description"),
          path: "/bilan-de-competences",
          serviceType: "Bilan de compétences",
        })}
      />
      <JsonLd data={faqSchema(pageFaq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: nav("bilanCompetences"), path: "/bilan-de-competences" },
        ])}
      />
    </>
  );
}

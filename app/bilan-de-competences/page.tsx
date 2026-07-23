import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { CtaBand } from "@/components/brand/cta-band";
import { BilanHero } from "@/components/sections/bilan/hero";
import { Pourquoi, Citation, Pratique } from "@/components/sections/bilan/content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("bilan.meta");
  return buildPageMetadata({
    path: "/bilan-de-competences",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BilanPage() {
  const t = await getTranslations("bilan");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");

  return (
    <>
      <BilanHero />
      <Pourquoi />
      <Citation />
      <Pratique />
      <CtaBand
        title={t("ctaBand.title")}
        text={t("ctaBand.text")}
        ctaLabel={common("cta")}
        ctaAria={common("ctaAria")}
        location="bilan-band"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: nav("bilanCompetences"), path: "/bilan-de-competences" },
        ])}
      />
    </>
  );
}

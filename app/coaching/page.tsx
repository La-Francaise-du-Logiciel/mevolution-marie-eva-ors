import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { CtaBand } from "@/components/brand/cta-band";
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

export default async function CoachingPage() {
  const t = await getTranslations("coaching");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");

  return (
    <>
      <CoachingHero />
      <Promesses />
      <Phases />
      <Modalites />
      <Histoire />
      <CtaBand
        title={t("ctaBand.title")}
        text={t("ctaBand.text")}
        ctaLabel={common("cta")}
        ctaAria={common("ctaAria")}
        location="coaching-band"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: nav("coaching"), path: "/coaching" },
        ])}
      />
    </>
  );
}

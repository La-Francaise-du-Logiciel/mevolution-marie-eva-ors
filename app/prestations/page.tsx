import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { CtaBand } from "@/components/brand/cta-band";
import { PrestationsHero } from "@/components/sections/prestations/hero";
import { ServicesGrid } from "@/components/sections/prestations/services";
import { CadreSouple } from "@/components/sections/prestations/cadre";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("prestations.meta");
  return buildPageMetadata({
    path: "/prestations",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrestationsPage() {
  const t = await getTranslations("prestations");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");

  return (
    <>
      <PrestationsHero />
      <ServicesGrid />
      <CadreSouple />
      <CtaBand
        title={t("ctaBand.title")}
        text={t("ctaBand.text")}
        ctaLabel={common("cta")}
        ctaAria={common("ctaAria")}
        location="prestations-band"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: nav("prestations"), path: "/prestations" },
        ])}
      />
    </>
  );
}

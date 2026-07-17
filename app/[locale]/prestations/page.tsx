import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { CtaBand } from "@/components/brand/cta-band";
import { PrestationsHero } from "@/components/sections/prestations/hero";
import { ServicesGrid } from "@/components/sections/prestations/services";
import { CadreSouple } from "@/components/sections/prestations/cadre";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "prestations.meta" });
  return buildPageMetadata({
    locale,
    path: "/prestations",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrestationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "prestations" });
  const common = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });

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
        data={breadcrumbSchema(locale, [
          { name: nav("home"), path: "/" },
          { name: nav("prestations"), path: "/prestations" },
        ])}
      />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, personSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { CtaBand } from "@/components/brand/cta-band";
import { AboutHero } from "@/components/sections/about/hero";
import { Parcours } from "@/components/sections/about/parcours";
import { Valeurs } from "@/components/sections/about/valeurs";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return buildPageMetadata({
    locale,
    path: "/a-propos",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const common = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <AboutHero />
      <Parcours />
      <Valeurs />
      <CtaBand
        title={t("ctaBand.title")}
        text={t("ctaBand.text")}
        ctaLabel={common("cta")}
        ctaAria={common("ctaAria")}
        withLeaf
        location="about-band"
      />

      <JsonLd
        data={personSchema(locale, {
          name: siteConfig.founder,
          jobTitle: t("jobTitle"),
          description: t("meta.description"),
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav("home"), path: "/" },
          { name: nav("about"), path: "/a-propos" },
        ])}
      />
    </>
  );
}

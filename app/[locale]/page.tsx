import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/json-ld";
import { CtaBand } from "@/components/brand/cta-band";
import { HomeHero } from "@/components/sections/home/hero";
import { PourQui } from "@/components/sections/home/pour-qui";
import { Accompagnements } from "@/components/sections/home/accompagnements";
import { Methode } from "@/components/sections/home/methode";
import { Temoignages } from "@/components/sections/home/temoignages";
import { HomeFaq } from "@/components/sections/home/faq";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return buildPageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const faq = await getTranslations({ locale, namespace: "home.faq" });
  const faqItems = faq.raw("items") as { q: string; a: string }[];

  return (
    <>
      <HomeHero />
      <PourQui />
      <Accompagnements />
      <Methode />
      <Temoignages />
      <CtaBand
        title={t("ctaBand.title")}
        text={t("ctaBand.text")}
        ctaLabel={common("cta")}
        ctaAria={common("ctaAria")}
        withLeaf
        location="home-band"
      />
      <HomeFaq />

      <JsonLd data={faqSchema(faqItems)} />
      <JsonLd data={breadcrumbSchema(locale, [{ name: nav("home"), path: "/" }])} />
    </>
  );
}

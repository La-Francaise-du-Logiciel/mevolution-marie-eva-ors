import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, personSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { CtaBand } from "@/components/brand/cta-band";
import { HomeHero } from "@/components/sections/home/hero";
import { About } from "@/components/sections/home/about";
import { PourQui } from "@/components/sections/home/pour-qui";
import { Accompagnements } from "@/components/sections/home/accompagnements";
import { Methode } from "@/components/sections/home/methode";
import { Temoignages } from "@/components/sections/home/temoignages";
import { HomeFaq } from "@/components/sections/home/faq";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.meta");
  return buildPageMetadata({
    path: "/",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const faq = await getTranslations("home.faq");
  const faqItems = faq.raw("items") as { q: string; a: string }[];

  return (
    <>
      <HomeHero />
      <About />
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
      <JsonLd
        data={personSchema({
          name: siteConfig.founder,
          jobTitle: t("about.jobTitle"),
          description: t("meta.description"),
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: nav("home"), path: "/" }])} />
    </>
  );
}

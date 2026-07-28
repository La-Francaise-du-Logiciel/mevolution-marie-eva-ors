import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, personSchema, reviewsSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { CtaBand } from "@/components/brand/cta-band";
import { TrustBar } from "@/components/brand/trust-bar";
import { HomeHero } from "@/components/sections/home/hero";
import { About } from "@/components/sections/home/about";
import { PourQui } from "@/components/sections/home/pour-qui";
import { Accompagnements } from "@/components/sections/home/accompagnements";
import { Comparaison } from "@/components/sections/home/comparaison";
import { Methode } from "@/components/sections/home/methode";
import { Engagements } from "@/components/sections/home/engagements";
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
  const reviews = t.raw("temoignages.items") as {
    quote: string;
    author: string;
    rating: number;
    date: string;
  }[];

  return (
    <>
      {/*
        Ordre revu (audit §6.1) : le visiteur se reconnaît dans son problème
        (« Pour qui ? ») avant qu'on lui parle de l'offre, puis de la personne.
        La preuve arrive juste avant la décision, et la FAQ lève les dernières
        objections AVANT le CTA final — elle le suivait auparavant.
      */}
      <HomeHero />
      <TrustBar />
      <PourQui />
      <Accompagnements />
      <Comparaison />
      <About />
      <Methode />
      <Engagements />
      <Temoignages />
      <HomeFaq />
      <CtaBand
        title={t("ctaBand.title")}
        text={t("ctaBand.text")}
        ctaLabel={common("ctaBook")}
        ctaAria={common("ctaAria")}
        withLeaf
        location="home-band"
      />

      <JsonLd data={faqSchema(faqItems)} />
      {reviewsSchema(reviews).map((review, index) => (
        <JsonLd key={index} data={review} />
      ))}
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

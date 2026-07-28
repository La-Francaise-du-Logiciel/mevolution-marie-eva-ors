import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, personSchema, reviewsSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
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
        objections AVANT le CTA final, alors qu'elle le suivait auparavant.
      */}
      {/*
        Hero + bandeau de confiance occupent exactement la hauteur d'écran restante
        sous l'en-tête (78 px + 1 px de filet) : le bandeau vient donc se caler sur
        le bas de la fenêtre, et marque la ligne de flottaison. Le hero (`flex-1`)
        absorbe la place libre, si bien que la hauteur réelle du bandeau n'a pas à
        être connue ici. En mobile / tablette, aucune contrainte : le flux reste
        naturel. Sur un écran trop court pour tout contenir, le bandeau repasse
        simplement sous le pli plutôt que de rogner le contenu.
      */}
      <div className="flex flex-col lg:min-h-[calc(100dvh-79px)]">
        <HomeHero />
        <TrustBar />
      </div>
      <PourQui />
      <Accompagnements />
      <Comparaison />
      <About />
      <Methode />
      <Engagements />
      <Temoignages />
      <HomeFaq />

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

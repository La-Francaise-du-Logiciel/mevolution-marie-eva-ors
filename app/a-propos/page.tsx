import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, personSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { CtaBand } from "@/components/brand/cta-band";
import { AboutHero } from "@/components/sections/about/hero";
import { Parcours } from "@/components/sections/about/parcours";
import { Valeurs } from "@/components/sections/about/valeurs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.meta");
  return buildPageMetadata({
    path: "/a-propos",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");

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
        data={personSchema({
          name: siteConfig.founder,
          jobTitle: t("jobTitle"),
          description: t("meta.description"),
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: nav("about"), path: "/a-propos" },
        ])}
      />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/sections/legal/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.privacy.meta");
  return buildPageMetadata({
    path: "/politique-de-confidentialite",
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

export default async function PolitiqueConfidentialitePage() {
  const t = await getTranslations("legal.privacy");
  const nav = await getTranslations("nav");
  const sections = t.raw("sections") as { title: string; body: string }[];

  const resolved = sections.map((section) => ({
    title: section.title,
    body: section.body
      .replaceAll("{founder}", siteConfig.founder)
      .replaceAll("{email}", siteConfig.email),
  }));

  return (
    <>
      <LegalPage
        eyebrow={t("title")}
        title={t("title")}
        lead={t("lead")}
        updated={t("updated")}
        sections={resolved}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: t("title"), path: "/politique-de-confidentialite" },
        ])}
      />
    </>
  );
}

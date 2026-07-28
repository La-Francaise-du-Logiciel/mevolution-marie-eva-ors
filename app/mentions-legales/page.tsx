import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { credentials, siteConfig } from "@/lib/site";
import { Reveal } from "@/components/brand/reveal";
import { LegalPage } from "@/components/sections/legal/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.mentions.meta");
  return buildPageMetadata({
    path: "/mentions-legales",
    title: t("title"),
    description: t("description"),
    // Page utile aux visiteurs et à la confiance, sans intérêt en résultat de recherche.
    noIndex: true,
  });
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations("legal.mentions");
  const nav = await getTranslations("nav");
  const sections = t.raw("sections") as { title: string; body: string }[];

  const resolved = sections.map((section) => ({
    title: section.title,
    body: section.body
      .replace("{site}", siteConfig.name)
      .replace("{founder}", siteConfig.founder)
      .replace("{email}", siteConfig.email)
      .replace("{phone}", siteConfig.phoneDisplay),
  }));

  // Informations légales obligatoires — affichées uniquement lorsqu'elles sont
  // renseignées dans `lib/site.ts` (jamais inventées).
  const identity = [
    { label: t("labels.legalForm"), value: credentials.legalForm },
    { label: t("labels.siret"), value: credentials.siret },
    { label: t("labels.nda"), value: credentials.nda },
    { label: t("labels.qualiopi"), value: credentials.qualiopi },
    { label: t("labels.address"), value: credentials.postalAddress },
    { label: t("labels.insurance"), value: credentials.insurance },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <>
      <LegalPage
        eyebrow={t("title")}
        title={t("title")}
        lead={t("lead", { site: siteConfig.name })}
        sections={resolved}
      >
        {identity.length > 0 && (
          <div className="mt-9 max-w-[760px]">
            <Reveal>
              <dl className="border-mv-line divide-y divide-[#f0eae0] rounded-[20px] border bg-white">
                {identity.map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 p-5 sm:flex-row sm:gap-6">
                    <dt className="text-mv-forest w-[220px] flex-none text-[12px] font-extrabold tracking-[0.1em] uppercase">
                      {row.label}
                    </dt>
                    <dd className="text-mv-ink-soft text-[15.5px]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        )}

        {identity.length === 0 && (
          <div className="mt-9 max-w-[760px]">
            <Reveal>
              <p className="border-mv-line bg-mv-pastel-violet/60 text-mv-ink-soft rounded-[18px] border p-5 text-[15px] leading-[1.65]">
                {t("pendingNotice")}
              </p>
            </Reveal>
          </div>
        )}
      </LegalPage>

      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: t("title"), path: "/mentions-legales" },
        ])}
      />
    </>
  );
}

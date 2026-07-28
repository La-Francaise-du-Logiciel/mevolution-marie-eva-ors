import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Button } from "@/components/ui/button";

type Row = { label: string; coaching: string; bilan: string };

/**
 * « Coaching ou bilan ? » : lève l'objection n°1 des visiteurs qui ne savent pas
 * choisir entre les deux offres (audit §3.3 et P1 #19).
 *
 * Rendu en vraie `<table>` : lisible au lecteur d'écran et indexable, avec
 * bascule en cartes empilées sur mobile (aucun défilement horizontal).
 */
export function Comparaison() {
  const t = useTranslations("home.comparaison");
  const rows = t.raw("rows") as Row[];
  const columns = t.raw("columns") as string[];

  return (
    <section id="comparaison" className="scroll-mt-20">
      <Container className="py-16 md:py-20 lg:py-[88px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-12">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
          <p className="text-mv-stone mt-3.5 text-[16px] leading-relaxed md:text-lg">{t("lead")}</p>
        </Reveal>

        <Reveal>
          <div className="border-mv-line overflow-hidden rounded-[24px] border bg-white">
            {/* Desktop : tableau comparatif */}
            <table className="hidden w-full border-collapse text-left md:table">
              <caption className="sr-only">{t("title")}</caption>
              <thead>
                <tr className="bg-mv-pastel-green/60">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="text-mv-forest border-b border-[#e4ded2] px-6 py-4 text-[13px] font-extrabold tracking-[0.08em] uppercase"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-b border-[#f0eae0] last:border-b-0">
                    <th
                      scope="row"
                      className="text-mv-ink w-[22%] px-6 py-5 align-top text-[15px] font-bold"
                    >
                      {row.label}
                    </th>
                    <td className="text-mv-stone px-6 py-5 align-top text-[15px] leading-[1.6]">
                      {row.coaching}
                    </td>
                    <td className="text-mv-stone px-6 py-5 align-top text-[15px] leading-[1.6]">
                      {row.bilan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile : deux blocs empilés, même contenu */}
            <div className="md:hidden">
              {[1, 2].map((columnIndex) => (
                <div key={columnIndex} className="border-b border-[#f0eae0] last:border-b-0">
                  <h3 className="text-mv-forest bg-mv-pastel-green/60 px-6 py-3.5 text-[13px] font-extrabold tracking-[0.08em] uppercase">
                    {columns[columnIndex]}
                  </h3>
                  <dl className="px-6 py-4">
                    {rows.map((row, index) => (
                      <div key={index} className="py-2.5">
                        <dt className="text-mv-ink text-[14px] font-bold">{row.label}</dt>
                        <dd className="text-mv-stone mt-1 text-[15px] leading-[1.6]">
                          {columnIndex === 1 ? row.coaching : row.bilan}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-mv-stone max-w-[560px] text-[15.5px] leading-[1.65]">
              {t("footnote")}
            </p>
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                {t("cta")}
                <ArrowRight className="size-[18px]" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

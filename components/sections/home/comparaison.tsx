import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Button } from "@/components/ui/button";

type Row = { label: string; coaching: string; bilan: string };

/** Comparatif affiché uniquement à partir du breakpoint tablette / desktop. */
export function Comparaison() {
  const t = useTranslations("home.comparaison");
  const rows = t.raw("rows") as Row[];
  const columns = t.raw("columns") as string[];

  return (
    <section id="comparaison" className="hidden scroll-mt-20 md:block">
      <Container className="py-20 lg:py-[88px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-12">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[38px] leading-[1.12] font-medium lg:text-[42px]">
            {t("title")}
          </h2>
          <p className="text-mv-stone mt-3.5 text-lg leading-relaxed">{t("lead")}</p>
        </Reveal>

        <Reveal>
          <div className="border-mv-line overflow-hidden rounded-[24px] border bg-white">
            <table className="w-full border-collapse text-left">
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

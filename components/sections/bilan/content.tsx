import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

/** Pourquoi faire un bilan / à qui il s'adresse — deux blocs côte à côte. */
export function Pourquoi() {
  const t = useTranslations("bilan");

  return (
    <section>
      <Container className="grid gap-8 pt-6 pb-16 md:grid-cols-2 md:pb-20">
        <Reveal>
          <h2 className="mb-3 font-serif text-[24px] leading-[1.2] font-medium sm:text-[27px]">
            {t("pourquoi.title")}
          </h2>
          <p className="text-mv-stone text-[16px] leading-[1.7]">{t("pourquoi.text")}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-3 font-serif text-[24px] leading-[1.2] font-medium sm:text-[27px]">
            {t("pourQui.title")}
          </h2>
          <p className="text-mv-stone text-[16px] leading-[1.7]">{t("pourQui.text")}</p>
        </Reveal>
      </Container>
    </section>
  );
}

/** Citation Benjamin Franklin + paragraphes explicatifs. */
export function Citation() {
  const t = useTranslations("bilan.citation");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="bg-mv-forest">
      <Container className="py-16 md:py-20 lg:py-[80px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <span className="mb-5 block font-serif text-[56px] leading-[.5] text-white/25">“</span>
          <p className="mb-3 font-serif text-[24px] leading-[1.3] font-medium text-white sm:text-[28px]">
            {t("quote")}
          </p>
          <p className="mb-8 text-[14px] font-bold tracking-[0.08em] text-white/60 uppercase">
            {t("author")}
          </p>
          <div className="mx-auto flex max-w-[620px] flex-col gap-5 text-left">
            {paragraphs.map((p, index) => (
              <p key={index} className="text-[16px] leading-[1.75] text-white/85">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type PracticeItem = { label: string; value: string; detail: string };

/** Grille pratique : durée, formules, financement, méthode. */
export function Pratique() {
  const t = useTranslations("bilan.pratique");
  const items = t.raw("items") as PracticeItem[];

  return (
    <section>
      <Container className="py-16 md:py-20 lg:py-[88px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-12">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium sm:text-[34px] lg:text-[36px]">
            {t("title")}
          </h2>
          <p className="text-mv-stone mt-3.5 text-[16px] leading-relaxed md:text-lg">{t("lead")}</p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 90} className="h-full">
              <div className="border-mv-line hover:border-mv-line-strong h-full rounded-[20px] border bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_52px_-34px_rgba(8,59,53,0.5)]">
                <div className="text-mv-forest mb-2 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                  {item.label}
                </div>
                <div className="mb-1.5 font-serif text-[19px] leading-snug font-medium">
                  {item.value}
                </div>
                <p className="text-mv-stone text-[13.5px] leading-[1.5]">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * Confidentialité vis-à-vis de l'employeur — objection n°1 du bilan de compétences,
 * absente du site jusqu'ici (audit §3.3).
 */
export function Confidentialite() {
  const t = useTranslations("bilan.confidentialite");

  return (
    <section>
      <Container className="pb-16 md:pb-20">
        <Reveal>
          <div className="border-mv-line flex flex-col gap-5 rounded-[24px] border bg-white p-8 md:flex-row md:items-start md:gap-7 md:p-10">
            <span className="bg-mv-pastel-green text-mv-forest inline-flex size-14 flex-none items-center justify-center rounded-[16px]">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <div className="max-w-[680px]">
              <h2 className="mb-2.5 font-serif text-[24px] leading-[1.2] font-medium sm:text-[27px]">
                {t("title")}
              </h2>
              <p className="text-mv-stone text-[16px] leading-[1.7]">{t("text")}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

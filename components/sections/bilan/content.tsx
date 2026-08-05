import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { QualiopiCertification } from "@/components/brand/qualiopi-certification";
import { Reveal } from "@/components/brand/reveal";

/** Pourquoi faire un bilan / à qui il s'adresse : deux blocs côte à côte. */
export function Pourquoi() {
  const t = useTranslations("bilan");

  return (
    <section className="hidden md:block">
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

/** Certification du processus qualité, affichée avec sa catégorie officielle. */
export function Qualiopi() {
  const t = useTranslations("bilan.qualiopi");

  return (
    <section className="bg-mv-pastel-green/70">
      <Container className="py-12 md:py-16 lg:py-[72px]">
        <Reveal className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
          <div className="max-w-[620px]">
            <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
            <h2 className="font-serif text-[28px] leading-[1.12] font-medium sm:text-[34px] lg:text-[36px]">
              {t("title")}
            </h2>
            <p className="text-mv-stone mt-4 text-[16px] leading-[1.7] md:text-lg">{t("text")}</p>
          </div>
          <QualiopiCertification eager className="justify-self-center md:justify-self-end" />
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Citation Benjamin Franklin + paragraphes explicatifs.
 *
 * Fond violet pastel et non vert : cette section précède immédiatement le pied
 * de page, lui-même vert foncé, et deux verts qui se touchaient formaient un seul
 * bloc sombre, sans respiration entre le contenu et le footer.
 */
export function Citation() {
  const t = useTranslations("bilan.citation");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="bg-mv-pastel-violet">
      <Container className="py-12 md:py-20 lg:py-[80px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <span className="text-mv-grape/30 mb-5 block font-serif text-[56px] leading-[.5]">“</span>
          <p className="text-mv-ink mb-3 font-serif text-[24px] leading-[1.3] font-medium sm:text-[28px]">
            {t("quote")}
          </p>
          <p className="text-mv-grape mb-8 text-[14px] font-bold tracking-[0.08em] uppercase">
            {t("author")}
          </p>
          <div className="mx-auto flex max-w-[620px] flex-col gap-4 text-left md:gap-5">
            {paragraphs.map((p, index) => (
              <p key={index} className="text-mv-stone text-[16px] leading-[1.75]">
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
      <Container className="py-12 md:py-20 lg:py-[88px]">
        <Reveal className="mb-7 max-w-[640px] md:mb-10 lg:mb-12">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium sm:text-[34px] lg:text-[36px]">
            {t("title")}
          </h2>
          <p className="text-mv-stone mt-3.5 text-[16px] leading-relaxed md:text-lg">{t("lead")}</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 90} className="h-full">
              <div className="border-mv-line hover:border-mv-line-strong mv-lift h-full rounded-[20px] border bg-white p-5 md:p-6">
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
 * Confidentialité vis-à-vis de l'employeur : objection n°1 du bilan de compétences,
 * absente du site jusqu'ici (audit §3.3).
 */
export function Confidentialite() {
  const t = useTranslations("bilan.confidentialite");

  return (
    <section>
      <Container className="pb-12 md:pb-20">
        <Reveal>
          {/*
            Grille en deux colonnes (même principe que le bloc « Tarifs » de la page
            Coaching). En mobile, l'icône accompagne le titre sur une même ligne et le
            paragraphe passe dessous sur toute la largeur. Dès `md`, l'icône s'étend sur
            les deux rangées : on retrouve le bandeau d'origine, icône à gauche du bloc.
          */}
          <div className="border-mv-line grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 rounded-[24px] border bg-white p-5 sm:p-8 md:items-start md:gap-x-7 md:gap-y-2.5 md:p-10">
            <span className="bg-mv-pastel-green text-mv-forest inline-flex size-12 flex-none items-center justify-center rounded-[16px] sm:size-14 md:row-span-2">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <h2 className="font-serif text-[24px] leading-[1.2] font-medium sm:text-[27px]">
              {t("title")}
            </h2>
            <p className="text-mv-stone col-span-2 max-w-[680px] text-[16px] leading-[1.7] md:col-span-1">
              {t("text")}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

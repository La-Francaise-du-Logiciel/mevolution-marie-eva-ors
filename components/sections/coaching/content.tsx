import { Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";

/** Ce que propose l'accompagnement, + citation de positionnement. */
export function Promesses() {
  const t = useTranslations("coaching.promesses");
  const items = t.raw("items") as string[];

  return (
    <section>
      <Container className="grid gap-7 pt-5 pb-12 md:gap-10 md:pt-6 md:pb-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium sm:text-[34px] lg:text-[36px]">
            {t("title")}
          </h2>
          {/* Espaces insécables : en typographie française les guillemets ne se
              séparent jamais du texte qu'ils encadrent : le « » ne peut donc plus
              se retrouver seul sur la dernière ligne. */}
          <p className="text-mv-grape mt-5 font-serif text-[22px] leading-snug italic md:mt-6 lg:text-[24px]">
            {`« ${t("quote")} »`}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="flex flex-col gap-4 md:gap-5">
            {items.map((_, index) => (
              <li key={index} className="flex items-start gap-3">
                <Leaf size={14} className="bg-mv-grape mt-1.5 flex-none" />
                <span className="text-mv-stone text-[16px] leading-[1.6] md:text-[17px]">
                  {t.rich(`items.${index}`, {
                    strong: (chunks) => <strong className="text-mv-ink font-bold">{chunks}</strong>,
                  })}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

type Phase = { title: string; text: string };

/** Déroulement en 4 phases (badges numérotés). */
export function Phases() {
  const t = useTranslations("coaching.phases");
  const items = t.raw("items") as Phase[];
  const colors = ["bg-mv-forest", "bg-mv-grape", "bg-mv-forest", "bg-mv-grape"];

  return (
    <section className="bg-mv-forest">
      <Container className="py-12 md:py-20 lg:py-[88px]">
        <Reveal className="mb-8 max-w-[640px] md:mb-10 lg:mb-12">
          <Eyebrow tone="lime" className="mb-4">
            {t("eyebrow")}
          </Eyebrow>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium text-white sm:text-[34px] lg:text-[38px]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {items.map((phase, index) => (
            <Reveal key={index} delay={index * 100} className="h-full">
              {/* Numéro et titre sur une même ligne à toutes les largeurs (voir la
                  remarque dans home/accompagnements.tsx). Seule la marge interne
                  s'allège en mobile. */}
              <div className="mv-lift flex h-full gap-4 rounded-[22px] bg-white p-5 [--mv-lift-shadow:0_34px_60px_-34px_rgba(0,0,0,0.5)] sm:gap-5 sm:p-7">
                <span
                  className={`inline-flex size-10 flex-none items-center justify-center rounded-full font-serif text-[17px] text-white ${colors[index % colors.length]}`}
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1.5 text-[17px] font-bold">{phase.title}</h3>
                  <p className="text-mv-stone text-[15px] leading-[1.6]">{phase.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

type ModaliteItem = { title: string; text: string };

/** Modalités pratiques : présentiel / distanciel / main dans la main. */
export function Modalites() {
  const t = useTranslations("coaching.modalites");
  const items = t.raw("items") as ModaliteItem[];

  return (
    <section>
      <Container className="py-12 md:py-20">
        <Reveal>
          <div className="border-mv-line hover:border-mv-line-strong mv-lift rounded-[28px] border bg-white p-5 sm:p-8 md:p-12 lg:p-[52px]">
            <h2 className="mb-6 font-serif text-[26px] font-medium sm:text-[30px] md:mb-8 lg:text-[34px]">
              {t("title")}
            </h2>
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {items.map((item, index) => (
                <div key={index}>
                  <h3 className="text-mv-forest mb-2 text-[13px] font-extrabold tracking-[0.08em] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-mv-stone text-[15.5px] leading-[1.65]">{item.text}</p>
                </div>
              ))}
            </div>

            {/*
              Transparence tarifaire : l'objection n°1 du site (audit §3.3).

              Grille en deux colonnes. En mobile, l'icône se place à côté du libellé
              « Tarifs » et le texte passe dessous sur toute la largeur : l'icône n'est
              pas orpheline au-dessus du bloc, et la colonne de texte n'est pas rétrécie
              par l'icône. Dès `sm`, l'icône s'étend sur les deux rangées et l'on
              retrouve la disposition d'origine, icône à gauche du bloc entier.
            */}
            <div className="bg-mv-pastel-violet/70 mt-7 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 rounded-[18px] p-5 sm:items-start sm:gap-x-5 sm:gap-y-1.5 md:mt-10 md:p-7">
              <span className="bg-mv-grape/12 text-mv-grape inline-flex size-11 flex-none items-center justify-center rounded-[13px] sm:row-span-2">
                <Wallet className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-mv-grape text-[11px] font-extrabold tracking-[0.12em] uppercase">
                {t("tarif.label")}
              </h3>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-mv-ink text-[17px] leading-[1.45] font-bold md:text-[18px]">
                  {t("tarif.title")}
                </p>
                <p className="text-mv-stone mt-2 text-[15.5px] leading-[1.65]">{t("tarif.text")}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

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
      <Container className="grid gap-10 pt-6 pb-16 md:pb-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium sm:text-[34px] lg:text-[36px]">
            {t("title")}
          </h2>
          {/* Espaces insécables : en typographie française les guillemets ne se
              séparent jamais du texte qu'ils encadrent : le « » ne peut donc plus
              se retrouver seul sur la dernière ligne. */}
          <p className="text-mv-grape mt-6 font-serif text-[22px] leading-snug italic lg:text-[24px]">
            {`« ${t("quote")} »`}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="flex flex-col gap-5">
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
      <Container className="py-16 md:py-20 lg:py-[88px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-12">
          <Eyebrow tone="lime" className="mb-4">
            {t("eyebrow")}
          </Eyebrow>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium text-white sm:text-[34px] lg:text-[38px]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((phase, index) => (
            <Reveal key={index} delay={index * 100} className="h-full">
              {/* Mobile : pastille au-dessus du texte, même disposition que le
                  bloc « Tarifs » ci-dessous. Côte à côte à partir de `sm`. */}
              <div className="mv-lift flex h-full flex-col items-start gap-4 rounded-[22px] bg-white p-6 [--mv-lift-shadow:0_34px_60px_-34px_rgba(0,0,0,0.5)] sm:flex-row sm:gap-5 sm:p-7">
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
      <Container className="pt-16 pb-16 md:pt-20 md:pb-20">
        <Reveal>
          <div className="border-mv-line hover:border-mv-line-strong mv-lift rounded-[28px] border bg-white p-8 md:p-12 lg:p-[52px]">
            <h2 className="mb-8 font-serif text-[26px] font-medium sm:text-[30px] lg:text-[34px]">
              {t("title")}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {items.map((item, index) => (
                <div key={index}>
                  <h3 className="text-mv-forest mb-2 text-[13px] font-extrabold tracking-[0.08em] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-mv-stone text-[15.5px] leading-[1.65]">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Transparence tarifaire : l'objection n°1 du site (audit §3.3).
                En mobile l'icône passe au-dessus du texte : côte à côte, la colonne
                de texte devenait trop étroite. */}
            <div className="bg-mv-pastel-violet/70 mt-9 flex flex-col items-start gap-4 rounded-[18px] p-6 sm:flex-row md:mt-10 md:p-7">
              <span className="bg-mv-grape/12 text-mv-grape inline-flex size-11 flex-none items-center justify-center rounded-[13px]">
                <Wallet className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-mv-grape mb-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                  {t("tarif.label")}
                </h3>
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

type Paragraph = { year: string; text: string; quote?: string };

/**
 * Récit personnel de Maréva Ors : le différenciateur n°1 du site (audit §3.5).
 * Présenté en frise chronologique : les dates étaient déjà dans le texte,
 * les exposer casse le mur de paragraphes et rend la section scannable.
 */
export function Histoire() {
  const t = useTranslations("coaching.histoire");
  const paragraphs = t.raw("paragraphs") as Paragraph[];

  return (
    <section id="mon-histoire" className="scroll-mt-20">
      <Container className="pt-6 pb-16 md:pb-20">
        <Reveal className="mb-9 max-w-[640px]">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[26px] leading-[1.12] font-medium sm:text-[32px] lg:text-[34px]">
            {t("title")}
          </h2>
          <p className="text-mv-stone mt-3.5 text-[16px] leading-[1.7] md:text-[17px]">
            {t("lead")}
          </p>
        </Reveal>

        <Reveal delay={80} className="max-w-[760px]">
          <ol className="relative flex flex-col gap-8 pl-8 sm:pl-11">
            {/* Filet vertical de la frise */}
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[7px] w-px bg-[#e0d8c9] sm:left-[9px]"
            />
            {paragraphs.map((p, index) => (
              <li key={index} className="relative">
                <span
                  aria-hidden="true"
                  className="bg-mv-grape absolute top-[7px] -left-8 size-[15px] rounded-full shadow-[0_0_0_5px_#f7f4ee] sm:-left-11 sm:size-[19px]"
                />
                <p className="text-mv-forest mb-1.5 text-[12px] font-extrabold tracking-[0.14em] uppercase">
                  {p.year}
                </p>
                <p className="text-mv-stone text-[16px] leading-[1.75] md:text-[17px]">{p.text}</p>
                {p.quote && (
                  <p className="text-mv-grape border-mv-line mt-2.5 border-l-2 pl-4 text-[15px] leading-snug italic">
                    {p.quote}
                  </p>
                )}
              </li>
            ))}
          </ol>

          <p className="text-mv-ink mt-9 text-[17px] leading-[1.7] font-semibold md:text-[18px]">
            {t("closing")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

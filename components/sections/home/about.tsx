import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";
import { Glow } from "@/components/brand/glow";
import { PhotoPlaceholder } from "@/components/brand/photo-placeholder";

type Card = { title: string; text: string };

const ICON = [
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
  { badge: "bg-mv-pastel-violet", leaf: "bg-mv-grape" },
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
];

/** Section « À propos » — intégrée à l'accueil (portrait, parcours, valeurs). */
export function About() {
  const t = useTranslations("home.about");
  const common = useTranslations("common");
  const cards = t.raw("valeurs.cards") as Card[];

  return (
    <section id="a-propos" className="scroll-mt-20">
      <Container className="grid items-center gap-10 pt-16 pb-16 md:grid-cols-[.8fr_1.2fr] md:gap-10 md:pt-20 md:pb-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-[60px]">
        <Reveal className="order-1 md:order-2">
          <Eyebrow className="mb-5">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium tracking-[-0.01em] sm:text-[38px] lg:text-[42px]">
            {t.rich("title", {
              em: (chunks) => <em className="text-mv-grape italic">{chunks}</em>,
            })}
          </h2>
          <p className="text-mv-stone mt-6 max-w-[520px] text-[16px] leading-relaxed md:text-[19px] md:leading-[1.65]">
            {t.rich("lead", {
              strong: (chunks) => <strong className="text-mv-grape font-bold">{chunks}</strong>,
            })}
          </p>
        </Reveal>

        <Reveal
          delay={140}
          className="relative order-2 mx-auto w-full max-w-[400px] md:order-1 md:max-w-none"
        >
          <Glow color="rgba(136,72,154,0.32)" size={240} className="-top-14 -left-14 z-0" />
          <PhotoPlaceholder
            tone="violet"
            label={common("photoPortraitAlt")}
            className="mv-appear"
          />
        </Reveal>
      </Container>

      <Container className="grid items-start gap-8 pb-16 md:pb-20 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
        <Reveal>
          <h3 className="font-serif text-[24px] leading-[1.12] font-medium sm:text-[28px]">
            {t("parcours.title")}
          </h3>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-mv-stone max-w-[680px] text-[16px] leading-[1.75] md:text-lg">
            {t("parcours.text")}
          </p>
        </Reveal>
      </Container>

      <Container className="pb-16 md:pb-20 lg:pb-[88px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-11">
          <Eyebrow className="mb-4">{t("valeurs.eyebrow")}</Eyebrow>
          <h3 className="font-serif text-[26px] leading-[1.12] font-medium sm:text-[32px] lg:text-[34px]">
            {t("valeurs.title")}
          </h3>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={index} delay={index * 90} className="h-full">
              <div className="border-mv-line hover:border-mv-line-strong h-full rounded-[20px] border bg-white p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_52px_-34px_rgba(8,59,53,0.5)]">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`inline-flex size-12 shrink-0 items-center justify-center rounded-[14px] ${ICON[index % ICON.length].badge}`}
                  >
                    <Leaf size={17} className={ICON[index % ICON.length].leaf} />
                  </div>
                  <h4 className="text-[20px] font-bold">{card.title}</h4>
                </div>
                <p className="text-mv-stone text-[16px] leading-[1.6]">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

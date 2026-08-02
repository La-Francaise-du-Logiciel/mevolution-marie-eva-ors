import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";
import { Glow } from "@/components/brand/glow";
import { Photo } from "@/components/brand/photo";
import { photos } from "@/lib/site";

type Card = { title: string; text: string };

const ICON = [
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
  { badge: "bg-mv-pastel-violet", leaf: "bg-mv-grape" },
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
];

/** Section « À propos » : intégrée à l'accueil (portrait, mission, histoire, valeurs). */
export function About() {
  const t = useTranslations("home.about");
  const mission = useTranslations("home.mission");
  const common = useTranslations("common");
  const cards = t.raw("valeurs.cards") as Card[];

  return (
    <section id="a-propos" className="scroll-mt-20">
      <Container className="grid items-center gap-7 py-12 md:grid-cols-[.8fr_1.2fr] md:gap-10 md:py-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-[60px]">
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

          {/* Mission : énoncée explicitement et à un emplacement stratégique (audit §4.2). */}
          <div className="border-mv-grape/30 mt-7 max-w-[520px] border-l-[3px] pl-5">
            <p className="text-mv-forest mb-2 text-[11px] font-extrabold tracking-[0.16em] uppercase">
              {mission("eyebrow")}
            </p>
            <p className="text-mv-ink-soft font-serif text-[19px] leading-[1.45] italic md:text-[21px]">
              {mission.rich("text", {
                strong: (chunks) => <strong className="text-mv-grape not-italic">{chunks}</strong>,
              })}
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="relative order-2 mx-auto w-full max-w-[320px] md:order-1 md:max-w-none"
        >
          <Glow color="rgba(136,72,154,0.32)" size={240} className="-top-14 -left-14 z-0" />
          <Photo
            src={photos.aboutPortrait}
            alt={common("photoAboutAlt")}
            tone="violet"
            sizes="(max-width: 768px) 90vw, (max-width: 1180px) 45vw, 480px"
            pendingLabel={common("photoPending")}
            className="mv-appear"
          />
        </Reveal>
      </Container>

      <Container className="pb-12 md:pb-20 lg:pb-[88px]">
        <Reveal className="mb-7 max-w-[640px] md:mb-10 lg:mb-11">
          <Eyebrow className="mb-4">{t("valeurs.eyebrow")}</Eyebrow>
          <h3 className="font-serif text-[26px] leading-[1.12] font-medium sm:text-[32px] lg:text-[34px]">
            {t("valeurs.title")}
          </h3>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={index} delay={index * 90} className="h-full">
              <div className="border-mv-line hover:border-mv-line-strong mv-lift h-full rounded-[20px] border bg-white p-5 md:p-8">
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

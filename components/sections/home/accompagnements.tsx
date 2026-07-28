import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";
import { Button } from "@/components/ui/button";

type Card = {
  title: string;
  text: string;
  forWhom: string;
  howItWorks: string;
  result: string;
  href: string;
};

const ICON = [
  { badge: "bg-mv-pastel-violet", leaf: "bg-mv-grape" },
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
];

export function Accompagnements() {
  const t = useTranslations("home.accompagnements");
  const common = useTranslations("common");
  const cards = t.raw("cards") as Card[];
  const forWhomLabel = t("labels.forWhom");
  const howItWorksLabel = t("labels.howItWorks");
  const resultLabel = t("labels.result");

  return (
    <section id="accompagnements" className="bg-mv-forest scroll-mt-20">
      <Container className="py-16 md:py-20 lg:py-[88px]">
        <Reveal className="mb-10 lg:mb-12">
          <Eyebrow tone="lime" className="mb-4">
            {t("eyebrow")}
          </Eyebrow>
          <h2 className="max-w-[620px] font-serif text-[30px] leading-[1.12] font-medium text-white sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
          <p className="mt-3.5 max-w-[620px] text-[16px] leading-relaxed text-white/80 md:text-lg">
            {t("lead")}
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card, index) => (
            <Reveal key={index} delay={index * 110} className="h-full">
              <div className="mv-lift flex h-full flex-col rounded-[24px] bg-white p-6 [--mv-lift-shadow:0_34px_60px_-34px_rgba(0,0,0,0.5)] sm:p-8 lg:p-9">
                {/* Pastille et titre restent sur une même ligne à toutes les largeurs :
                    empilés, la pastille se retrouve orpheline au-dessus d'un titre court.
                    Le bloc « Tarifs » de la page Coaching s'empile, lui, parce que son
                    icône accompagne un paragraphe entier, pas un simple titre. */}
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className={`inline-flex size-[52px] shrink-0 items-center justify-center rounded-[15px] ${ICON[index % ICON.length].badge}`}
                  >
                    <Leaf size={19} className={ICON[index % ICON.length].leaf} />
                  </span>
                  <h3 className="font-serif text-[24px] font-medium lg:text-[27px]">
                    {card.title}
                  </h3>
                </div>
                <p className="text-mv-stone mb-6 text-[16px] leading-[1.6]">{card.text}</p>

                <div className="text-mv-forest mb-2 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                  {forWhomLabel}
                </div>
                <p className="text-mv-stone mb-5 text-[15px] leading-[1.6]">{card.forWhom}</p>

                <div className="text-mv-forest mb-2 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                  {howItWorksLabel}
                </div>
                <p className="text-mv-stone mb-5 text-[15px] leading-[1.6]">{card.howItWorks}</p>

                {/* Bénéfice concret plutôt que description de process (audit §3.2). */}
                <div className="text-mv-grape mb-2 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                  {resultLabel}
                </div>
                <p className="text-mv-ink-soft text-[15px] leading-[1.6] font-semibold">
                  {card.result}
                </p>

                <Button asChild variant="link" size="none" className="mt-auto self-start pt-6">
                  <Link href={card.href}>
                    {common("learnMore")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA intermédiaire : le visiteur vient de comprendre l'offre, c'est le pic
            d'intention. Auparavant il fallait scroller 4 sections de plus (audit §5.2 P3). */}
        <Reveal delay={120}>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="text-mv-lime inline-flex items-center gap-2 text-[16px] font-bold underline-offset-4 transition-opacity hover:opacity-80 md:text-[17px]"
            >
              {t("midCta")}
              <ArrowRight className="size-[18px]" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

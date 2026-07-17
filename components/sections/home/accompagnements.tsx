import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";
import { Button } from "@/components/ui/button";

type Card = { title: string; text: string };

const ICON = [
  { badge: "bg-mv-pastel-violet", leaf: "bg-mv-grape" },
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
];

export function Accompagnements() {
  const t = useTranslations("home.accompagnements");
  const common = useTranslations("common");
  const cards = t.raw("cards") as Card[];

  return (
    <section className="bg-mv-forest">
      <Container className="py-16 md:py-20 lg:py-[88px]">
        <Reveal className="mb-10 lg:mb-12">
          <Eyebrow tone="lime" withLeaf={false} className="mb-4">
            {t("eyebrow")}
          </Eyebrow>
          <h2 className="max-w-[620px] font-serif text-[30px] leading-[1.12] font-medium text-white sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card, index) => (
            <Reveal key={index} delay={index * 110} className="h-full">
              <div className="flex h-full flex-col rounded-[24px] bg-white p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-34px_rgba(0,0,0,0.5)] lg:p-9">
                <span
                  className={`mb-[22px] inline-flex size-[52px] items-center justify-center rounded-[15px] ${ICON[index % ICON.length].badge}`}
                >
                  <Leaf size={19} className={ICON[index % ICON.length].leaf} />
                </span>
                <h3 className="mb-3 font-serif text-[24px] font-medium lg:text-[27px]">
                  {card.title}
                </h3>
                <p className="text-mv-stone mb-6 text-[16px] leading-[1.6]">{card.text}</p>
                <Button asChild variant="link" size="none" className="mt-auto self-start">
                  <Link href="/prestations">
                    {common("learnMore")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

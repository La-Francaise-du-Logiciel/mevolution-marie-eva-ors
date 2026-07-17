import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";

type Card = { title: string; text: string };

const ICON = [
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
  { badge: "bg-mv-pastel-violet", leaf: "bg-mv-grape" },
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
];

export function Valeurs() {
  const t = useTranslations("about.valeurs");
  const cards = t.raw("cards") as Card[];

  return (
    <section>
      <Container className="pb-16 md:pb-20 lg:pb-[88px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-11">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={index} delay={index * 90} className="h-full">
              <div className="border-mv-line hover:border-mv-line-strong h-full rounded-[20px] border bg-white p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_52px_-34px_rgba(8,59,53,0.5)]">
                <div
                  className={`mb-[18px] inline-flex size-12 items-center justify-center rounded-[14px] ${ICON[index % ICON.length].badge}`}
                >
                  <Leaf size={17} className={ICON[index % ICON.length].leaf} />
                </div>
                <h3 className="mb-2 text-[20px] font-bold">{card.title}</h3>
                <p className="text-mv-stone text-[16px] leading-[1.6]">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

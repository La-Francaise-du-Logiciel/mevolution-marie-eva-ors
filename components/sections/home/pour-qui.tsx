import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

export function PourQui() {
  const t = useTranslations("home.pourQui");
  const cards = t.raw("cards") as string[];

  return (
    <section>
      <Container className="pt-6 pb-16 md:pb-20 lg:pb-[92px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-11">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
          <p className="text-mv-stone mt-3.5 text-[16px] leading-relaxed md:text-lg md:leading-[1.65]">
            {t("lead")}
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={index} delay={index * 90} className="h-full">
              <div className="border-mv-line hover:border-mv-line-strong h-full rounded-[20px] border bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_52px_-34px_rgba(8,59,53,0.5)]">
                <p className="text-mv-ink-soft text-[17px] leading-[1.55] font-semibold">{card}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

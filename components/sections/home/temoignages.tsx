import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

export function Temoignages() {
  const t = useTranslations("home.temoignages");

  return (
    <section>
      <Container className="pb-16 md:pb-20 lg:pb-[92px]">
        <Reveal className="mb-9 max-w-[640px] lg:mb-10">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {[0, 1].map((index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="rounded-[22px] border border-dashed border-[#d8cfc0] bg-white p-10 text-center md:p-11">
                <span className="text-mv-line-strong mb-3.5 block font-serif text-[56px] leading-[0.5]">
                  &ldquo;
                </span>
                <p className="text-mv-stone-3 font-mono text-[13.5px] leading-[1.7]">
                  {t("placeholder")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

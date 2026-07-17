import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";

export function CadreSouple() {
  const t = useTranslations("prestations.cadre");
  const points = t.raw("points") as string[];

  return (
    <section>
      <Container className="pt-6 pb-16 md:pb-20">
        <Reveal>
          <div className="bg-mv-forest rounded-[28px] p-8 md:p-12 lg:p-[52px]">
            <h2 className="mb-8 font-serif text-[26px] font-medium text-white sm:text-[30px] lg:text-[34px]">
              {t("title")}
            </h2>
            <div className="grid gap-6 md:grid-cols-3 md:gap-7">
              {points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Leaf size={14} className="bg-mv-lime mt-1.5 flex-none" />
                  <span className="text-[16px] leading-[1.55] text-white/90 md:text-[17px]">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

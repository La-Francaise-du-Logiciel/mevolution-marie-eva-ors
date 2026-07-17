import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Reveal } from "@/components/brand/reveal";

export function Parcours() {
  const t = useTranslations("about.parcours");

  return (
    <section>
      <Container className="grid items-start gap-8 pt-6 pb-16 md:pb-20 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
        <Reveal>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium sm:text-[34px] lg:text-[38px]">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-mv-stone max-w-[680px] text-[16px] leading-[1.75] md:text-lg">
            {t("text")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

type Step = { title: string; text: string };

const CIRCLE = ["bg-mv-forest", "bg-mv-grape", "bg-mv-forest"];

export function Methode() {
  const t = useTranslations("home.methode");
  const steps = t.raw("steps") as Step[];

  return (
    <section>
      <Container className="py-12 md:py-20 lg:py-[92px]">
        <Reveal className="mx-auto mb-8 max-w-[640px] text-center md:mb-12 lg:mb-14">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="relative grid gap-7 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute top-[26px] right-[16%] left-[16%] hidden h-0.5 md:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,#dcd3c4 0 8px,transparent 8px 16px)",
            }}
          />
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 120} className="relative z-[1] text-center">
              <span
                className={`mb-5 inline-flex size-[54px] items-center justify-center rounded-full font-serif text-[24px] text-white shadow-[0_0_0_8px_#f7f4ee] ${CIRCLE[index % CIRCLE.length]}`}
              >
                {index + 1}
              </span>
              <h3 className="mb-2 text-[19px] font-bold">{step.title}</h3>
              <p className="text-mv-stone mx-auto max-w-[300px] text-[15.5px] leading-[1.6]">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

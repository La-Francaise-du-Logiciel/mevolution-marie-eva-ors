import Link from "next/link";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

type Item = { q: string; a: string };

export function HomeFaq() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as Item[];

  return (
    <section id="faq" className="scroll-mt-20">
      <Container className="grid items-start gap-6 py-12 md:gap-8 md:py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-14 lg:py-[92px]">
        <Reveal>
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[28px] leading-[1.12] font-medium sm:text-[34px] lg:text-[40px]">
            {t("title")}
          </h2>
          <p className="text-mv-stone mt-4 text-[15.5px] leading-[1.7]">
            {t("lead")}{" "}
            <Link
              href="/contact"
              className="text-mv-grape hover:text-mv-grape-dark font-bold underline underline-offset-4 transition-colors"
            >
              Contact
            </Link>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div>
            {items.map((item, index) => (
              <details
                key={index}
                // La première réponse est ouverte : la section ne se présente pas
                // comme un mur de titres fermés (audit §6.4).
                open={index === 0}
                className="border-b border-[#e6ddce]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-bold md:py-5 md:text-lg">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="faq-sign text-mv-grape flex-none text-[24px] leading-none"
                  >
                    +
                  </span>
                </summary>
                <p className="text-mv-stone max-w-[640px] pb-5 text-[15.5px] leading-[1.7] md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

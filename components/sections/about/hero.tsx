import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";
import { PhotoPlaceholder } from "@/components/brand/photo-placeholder";

export function AboutHero() {
  const t = useTranslations("about.hero");
  const common = useTranslations("common");

  return (
    <section>
      <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-[60px] lg:pt-[76px] lg:pb-16">
        <Reveal>
          <Eyebrow className="mb-5">{t("eyebrow")}</Eyebrow>
          <h1 className="font-serif text-[34px] leading-[1.1] font-medium tracking-[-0.01em] sm:text-[46px] lg:text-[56px] lg:leading-[1.08] lg:tracking-[-0.015em]">
            {t.rich("title", {
              em: (chunks) => <em className="text-mv-grape italic">{chunks}</em>,
            })}
          </h1>
          <p className="text-mv-stone mt-6 max-w-[520px] text-[16px] leading-relaxed md:text-[19px] md:leading-[1.65]">
            {t.rich("lead", {
              strong: (chunks) => <strong className="text-mv-grape font-bold">{chunks}</strong>,
            })}
          </p>
        </Reveal>

        <Reveal delay={140} className="relative">
          <Leaf
            size={96}
            float="down"
            className="absolute -top-6 -left-6 z-0"
            style={{ background: "rgba(136,72,154,0.18)" }}
          />
          <PhotoPlaceholder
            tone="violet"
            label={common("photoPortraitAlt")}
            className="mv-appear"
          />
        </Reveal>
      </Container>
    </section>
  );
}

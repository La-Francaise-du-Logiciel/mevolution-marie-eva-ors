import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Glow } from "@/components/brand/glow";
import { Photo } from "@/components/brand/photo";
import { CalendlyLink } from "@/components/brand/calendly-link";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/site";

export function HomeHero() {
  const t = useTranslations("home.hero");
  const common = useTranslations("common");
  const reassurance = common.raw("reassuranceItems") as string[];

  return (
    <section>
      <Container className="grid items-center gap-10 py-12 md:grid-cols-[1.2fr_.8fr] md:gap-10 md:py-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:pt-[76px] lg:pb-[84px]">
        <Reveal>
          <Eyebrow className="mb-5">{t("eyebrow")}</Eyebrow>
          <h1 className="font-serif text-[37px] leading-[1.08] font-medium tracking-[-0.01em] sm:text-[52px] md:text-[42px] md:leading-[1.12] lg:text-[64px] lg:leading-[1.06] lg:tracking-[-0.015em]">
            {t.rich("title", {
              em: (chunks) => <em className="text-mv-grape italic">{chunks}</em>,
            })}
          </h1>
          <p className="text-mv-stone mt-6 max-w-[520px] text-[16px] leading-relaxed md:text-[19px] md:leading-[1.65]">
            {t("lead")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <CalendlyLink location="hero" aria-label={common("ctaAria")}>
                {common("ctaBook")}
                <ArrowRight className="size-[18px]" />
              </CalendlyLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="#accompagnements">{common("discoverServices")}</Link>
            </Button>
          </div>
          <ul className="mt-6 flex flex-col gap-2">
            {reassurance.map((item, index) => (
              <li key={index} className="text-mv-stone-2 flex items-start gap-2 text-sm">
                <Check
                  className="text-mv-forest mt-0.5 size-4 shrink-0"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="relative mx-auto w-full max-w-[400px] md:max-w-none">
          <Glow color="rgba(219,242,38,0.4)" size={260} className="-top-16 right-0 z-0" />
          <Glow
            color="rgba(136,72,154,0.3)"
            size={220}
            delay={3}
            className="-bottom-20 -left-10 z-0"
          />
          <Photo
            src={photos.heroPortrait}
            alt={common("photoHeroAlt")}
            tone="green"
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1180px) 45vw, 520px"
            pendingLabel={common("photoPending")}
            className="mv-appear"
          />
        </Reveal>
      </Container>
    </section>
  );
}

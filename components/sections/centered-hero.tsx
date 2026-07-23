import type { ReactNode } from "react";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

type CenteredHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  /** Contenu optionnel sous le lead (ex. bouton CTA). */
  children?: ReactNode;
};

/** Hero centré des sous-pages (Coaching, Bilan de compétences, Contact). */
export function CenteredHero({ eyebrow, title, lead, children }: CenteredHeroProps) {
  return (
    <section>
      <Container className="py-12 text-center md:py-16 lg:pt-[76px] lg:pb-14">
        <Reveal className="mx-auto max-w-[820px]">
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h1 className="font-serif text-[35px] leading-[1.1] font-medium tracking-[-0.01em] sm:text-[48px] lg:text-[58px] lg:leading-[1.08] lg:tracking-[-0.015em]">
            {title}
          </h1>
          <p className="text-mv-stone mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed md:text-[19px] md:leading-[1.65]">
            {lead}
          </p>
          {children && <div className="mt-8 flex justify-center">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Leaf } from "./leaf";
import { Reveal } from "./reveal";
import { CalendlyLink } from "./calendly-link";

type CtaBandProps = {
  title: string;
  text: string;
  ctaLabel: string;
  ctaAria?: string;
  withLeaf?: boolean;
  location: string;
};

/** Bandeau CTA pleine largeur violet (fin de page). */
export function CtaBand({
  title,
  text,
  ctaLabel,
  ctaAria,
  withLeaf = false,
  location,
}: CtaBandProps) {
  return (
    <section className="bg-mv-grape">
      <Container className="py-14 text-center md:py-[76px] lg:py-20">
        <Reveal>
          {withLeaf && <Leaf size={30} className="bg-mv-lime mb-6" />}
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium tracking-[-0.01em] text-white sm:text-[40px] lg:text-[44px]">
            {title}
          </h2>
          <p className="mx-auto mt-3.5 max-w-[560px] text-[17px] leading-relaxed text-white/85 md:text-lg">
            {text}
          </p>
          <div className="mt-7 flex justify-center">
            <Button asChild variant="white" size="lg">
              <CalendlyLink location={location} aria-label={ctaAria}>
                {ctaLabel}
                <ArrowRight className="size-[18px]" />
              </CalendlyLink>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

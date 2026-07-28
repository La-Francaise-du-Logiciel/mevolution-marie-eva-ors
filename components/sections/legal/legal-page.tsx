import type { ReactNode } from "react";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

type Section = { title: string; body: string };

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Ligne de mise à jour (politique de confidentialité). */
  updated?: string;
  sections: Section[];
  /** Bloc additionnel rendu avant les sections (ex. identité de l'entreprise). */
  children?: ReactNode;
};

/**
 * Gabarit commun des pages légales (mentions légales, confidentialité).
 * Colonne unique, mesure de lecture courte, typographie de marque conservée.
 */
export function LegalPage({ eyebrow, title, lead, updated, sections, children }: LegalPageProps) {
  return (
    <section>
      <Container className="py-12 md:py-16 lg:pt-[76px] lg:pb-20">
        <Reveal className="max-w-[760px]">
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h1 className="font-serif text-[34px] leading-[1.1] font-medium tracking-[-0.01em] sm:text-[44px] lg:text-[52px]">
            {title}
          </h1>
          <p className="text-mv-stone mt-5 text-[16px] leading-relaxed md:text-[18px] md:leading-[1.65]">
            {lead}
          </p>
          {updated && <p className="text-mv-stone-2 mt-3 text-[13.5px]">{updated}</p>}
        </Reveal>

        {children}

        <Reveal delay={80} className="mt-10 max-w-[760px] md:mt-12">
          <div className="flex flex-col gap-8">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="mb-2.5 font-serif text-[21px] leading-[1.25] font-medium sm:text-[24px]">
                  {section.title}
                </h2>
                <p className="text-mv-stone text-[15.5px] leading-[1.75] md:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

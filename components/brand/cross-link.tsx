import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "./container";
import { Reveal } from "./reveal";

type CrossLinkProps = {
  title: string;
  text: string;
  link: string;
  href: string;
};

/**
 * Passerelle entre les deux pages de service (audit §6.3).
 *
 * Évite l'impasse du visiteur arrivé par le SEO sur la mauvaise page,
 * et distribue le maillage interne entre `/coaching` et `/bilan-de-competences`.
 */
export function CrossLink({ title, text, link, href }: CrossLinkProps) {
  return (
    <section>
      <Container className="pb-12 md:pb-20">
        <Reveal>
          <div className="bg-mv-pastel-violet/70 border-mv-line rounded-[24px] border p-5 md:p-9">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="max-w-[640px]">
                <h2 className="font-serif text-[22px] leading-[1.2] font-medium sm:text-[26px]">
                  {title}
                </h2>
                <p className="text-mv-stone mt-2 text-[15.5px] leading-[1.65]">{text}</p>
              </div>
              <Link
                href={href}
                className="text-mv-grape hover:text-mv-grape-dark inline-flex flex-none items-center gap-2 text-[15px] font-bold transition-colors"
              >
                {link}
                <ArrowRight className="size-[18px]" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

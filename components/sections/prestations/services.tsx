import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Reveal } from "@/components/brand/reveal";
import { Leaf } from "@/components/brand/leaf";
import { Button } from "@/components/ui/button";
import { CalendlyLink } from "@/components/brand/calendly-link";

type Service = {
  title: string;
  description: string;
  forWhom: string;
  howItWorks: string;
};

const ICON = [
  { badge: "bg-mv-pastel-violet", leaf: "bg-mv-grape" },
  { badge: "bg-mv-pastel-green", leaf: "bg-mv-forest" },
];

export function ServicesGrid() {
  const t = useTranslations("prestations");
  const common = useTranslations("common");
  const services = t.raw("services") as Service[];
  const forWhom = t("labels.forWhom");
  const howItWorks = t("labels.howItWorks");

  return (
    <section>
      <Container className="grid gap-6 pt-5 pb-10 lg:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={index} delay={index * 120} className="h-full">
            <article className="border-mv-line flex h-full flex-col rounded-[26px] border bg-white p-8 shadow-[0_24px_46px_-34px_rgba(0,91,82,0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-34px_rgba(0,91,82,0.5)] lg:p-10">
              <div className="mb-5 flex items-center gap-4">
                <span
                  className={`inline-flex size-[54px] shrink-0 items-center justify-center rounded-2xl ${ICON[index % ICON.length].badge}`}
                >
                  <Leaf size={20} className={ICON[index % ICON.length].leaf} />
                </span>
                <h2 className="font-serif text-[26px] font-medium lg:text-[30px]">
                  {service.title}
                </h2>
              </div>
              <p className="text-mv-stone mb-6 text-[16px] leading-[1.65]">{service.description}</p>

              <div className="text-mv-forest mb-2 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                {forWhom}
              </div>
              <p className="text-mv-stone mb-5 text-[15.5px] leading-[1.6]">{service.forWhom}</p>

              <div className="text-mv-forest mb-2 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                {howItWorks}
              </div>
              <p className="text-mv-stone mb-7 text-[15.5px] leading-[1.6]">{service.howItWorks}</p>

              <Button asChild variant="primary" size="md" className="mt-auto self-start">
                <CalendlyLink location={`prestations-card-${index}`} aria-label={common("ctaAria")}>
                  {common("cta")}
                  <ArrowRight className="size-4" />
                </CalendlyLink>
              </Button>
            </article>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

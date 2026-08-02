import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { Container } from "@/components/brand/container";
import { Reveal } from "@/components/brand/reveal";
import { ContactHero } from "@/components/sections/contact/hero";
import { ContactBookingCard, ContactDetails } from "@/components/sections/contact/info";
import { ContactForm } from "@/components/sections/contact/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.meta");
  return buildPageMetadata({
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage() {
  const nav = await getTranslations("nav");

  return (
    <>
      <ContactHero />

      <section>
        <Container className="grid items-start gap-4 pt-4 pb-12 md:gap-6 md:pt-6 md:pb-20 lg:grid-cols-[.92fr_1.08fr] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-4">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <ContactBookingCard />
          </Reveal>
          <Reveal delay={120} className="lg:col-start-2 lg:row-start-1 lg:row-end-3">
            <ContactForm />
          </Reveal>
          <Reveal delay={80} className="lg:col-start-1 lg:row-start-2">
            <ContactDetails />
          </Reveal>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), path: "/" },
          { name: nav("contact"), path: "/contact" },
        ])}
      />
    </>
  );
}

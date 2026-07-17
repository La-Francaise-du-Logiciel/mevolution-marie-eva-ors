import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { Container } from "@/components/brand/container";
import { Reveal } from "@/components/brand/reveal";
import { ContactHero } from "@/components/sections/contact/hero";
import { ContactInfo } from "@/components/sections/contact/info";
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
        <Container className="grid items-start gap-8 pt-6 pb-16 md:pb-20 lg:grid-cols-[.92fr_1.08fr]">
          <Reveal>
            <ContactInfo />
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
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

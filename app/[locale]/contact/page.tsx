import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";
import { Container } from "@/components/brand/container";
import { Reveal } from "@/components/brand/reveal";
import { ContactHero } from "@/components/sections/contact/hero";
import { ContactInfo } from "@/components/sections/contact/info";
import { ContactForm } from "@/components/sections/contact/contact-form";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "nav" });

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
        data={breadcrumbSchema(locale, [
          { name: nav("home"), path: "/" },
          { name: nav("contact"), path: "/contact" },
        ])}
      />
    </>
  );
}

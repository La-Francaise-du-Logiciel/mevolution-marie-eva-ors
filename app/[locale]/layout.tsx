import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { mulish, newsreader } from "@/lib/fonts";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { JsonLd, organizationSchema, webSiteSchema } from "@/lib/json-ld";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/app/providers";

import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: t("title"),
      template: "%s · Mévolution",
    },
    description: t("description"),
    applicationName: siteConfig.shortName,
    authors: [{ name: siteConfig.founder }],
    creator: siteConfig.founder,
    publisher: siteConfig.name,
    keywords:
      locale === "fr"
        ? [
            "coaching emploi",
            "bilan de compétences",
            "reconversion professionnelle",
            "conseillère en évolution professionnelle",
            "Maréva Ors",
            "Orientaction",
          ]
        : ["job coaching", "skills assessment", "career change", "career counsellor", "Maréva Ors"],
    formatDetection: { telephone: true, email: true, address: false },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
    },
    twitter: { card: "summary_large_image" },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
      apple: "/brand/favicon-mauve-64.png",
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      className={`${mulish.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="focus:bg-mv-grape sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          {nav("skipToContent")}
        </a>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <PostHogProvider>
            <div className="flex min-h-dvh flex-col">
              <Header />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </PostHogProvider>
        </NextIntlClientProvider>

        <JsonLd data={organizationSchema(locale, t("description"))} />
        <JsonLd data={webSiteSchema(locale)} />
      </body>
    </html>
  );
}

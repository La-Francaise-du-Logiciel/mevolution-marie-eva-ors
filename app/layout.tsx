import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { mulish, newsreader } from "@/lib/fonts";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { JsonLd, organizationSchema, webSiteSchema } from "@/lib/json-ld";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/app/providers";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.meta");

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
    keywords: [
      "coaching emploi",
      "bilan de compétences",
      "reconversion professionnelle",
      "conseillère en évolution professionnelle",
      "Maréva Ors",
      "Orientaction",
    ],
    formatDetection: { telephone: true, email: true, address: false },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "fr_FR",
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

export default async function RootLayout({ children }: { children: ReactNode }) {
  const messages = await getMessages();
  const t = await getTranslations("home.meta");
  const nav = await getTranslations("nav");

  return (
    <html
      lang="fr"
      className={`${mulish.variable} ${newsreader.variable}`}
      // Signale à Next.js que le smooth-scroll CSS est volontaire : le routeur le
      // désactive le temps d'une navigation, qui atterrit donc bien en haut de page.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* Un rafraîchissement (F5) repart systématiquement du haut de la page :
            on neutralise la restauration de scroll du navigateur pour ce seul cas,
            sans toucher au comportement précédent/suivant. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(performance.getEntriesByType('navigation')[0]?.type==='reload'){history.scrollRestoration='manual';window.scrollTo(0,0);addEventListener('pageshow',function(){window.scrollTo(0,0)},{once:true})}}catch(e){}",
          }}
        />
        <a
          href="#main"
          className="focus:bg-mv-grape sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          {nav("skipToContent")}
        </a>

        <NextIntlClientProvider locale="fr" messages={messages}>
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

        <JsonLd data={organizationSchema(t("description"))} />
        <JsonLd data={webSiteSchema()} />
      </body>
    </html>
  );
}

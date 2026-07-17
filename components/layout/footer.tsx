import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Link from "next/link";
import { Container } from "@/components/brand/container";
import { siteConfig } from "@/lib/site";
import { NAV } from "./nav-items";

/** Pied de page commun (vert très foncé), grille 4 colonnes → empilé en mobile. */
export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mv-forest-deep text-white">
      <Container className="pt-12 pb-10 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marque */}
          <div>
            <Image
              src="/assets/logo-dark.svg"
              alt={t("nav.logoAlt")}
              width={225}
              height={90}
              className="h-[38px] w-auto brightness-0 invert"
              unoptimized
            />
            <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-white/60">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-mv-lime mb-4 text-[11px] font-extrabold tracking-[0.14em] uppercase">
              {t("footer.navTitle")}
            </h2>
            <nav className="flex flex-col gap-[11px]">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Réseaux */}
          <div>
            <h2 className="text-mv-lime mb-4 text-[11px] font-extrabold tracking-[0.14em] uppercase">
              {t("footer.followTitle")}
            </h2>
            <div className="flex flex-col gap-[11px]">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {t("footer.linkedin")}
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {t("footer.instagram")}
              </a>
              <a
                href={siteConfig.social.facebook}
                className="text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {t("footer.facebook")}
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-mv-lime mb-4 text-[11px] font-extrabold tracking-[0.14em] uppercase">
              {t("footer.contactTitle")}
            </h2>
            <div className="flex flex-col gap-[11px]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[15px] break-all text-white/80 transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.phoneHref}
                className="text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-11 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-white/40">{t("footer.rights", { year })}</p>
          <div className="flex gap-5">
            <a href="#" className="text-[13px] text-white/60 transition-colors hover:text-white">
              {t("footer.legal")}
            </a>
            <a href="#" className="text-[13px] text-white/60 transition-colors hover:text-white">
              {t("footer.privacy")}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

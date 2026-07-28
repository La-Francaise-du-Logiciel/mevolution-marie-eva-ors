import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/brand/container";
import { siteConfig, siteCredits } from "@/lib/site";
import { NavLink } from "./nav-link";
import { NAV } from "./nav-items";

/** Pied de page commun (vert très foncé) : marque centrée, puis 3 colonnes → empilé en mobile. */
export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mv-forest-deep text-white">
      {/* Dernier appel à l'action : le footer était purement navigationnel (audit §5.2). */}
      <Container className="border-b border-white/10 py-10 md:py-12">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div>
            <p className="font-serif text-[24px] leading-snug font-medium sm:text-[28px]">
              {t("footer.ctaTitle")}
            </p>
            <p className="mt-1.5 text-[15px] text-white/65">{t("footer.ctaText")}</p>
          </div>
          <Link
            href="/contact"
            className="bg-mv-lime text-mv-forest-deep mv-lift inline-flex flex-none items-center gap-2 rounded-full px-7 py-4 text-[15px] font-bold [--mv-lift-shadow:0_26px_44px_-20px_rgba(0,0,0,0.6)]"
          >
            {t("common.ctaBook")}
            <ArrowRight className="size-[17px]" aria-hidden="true" />
          </Link>
        </div>
      </Container>

      <Container className="pt-12 pb-10 md:pt-14">
        {/* Marque : logo agrandi et centré sur toute la largeur, textes en dessous
            (nouvelle disposition demandée par la cliente). */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/logo-dark.svg"
            alt={t("nav.logoAlt")}
            width={225}
            height={90}
            className="h-[64px] w-auto brightness-0 invert md:h-[72px]"
            unoptimized
          />
          <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-white/60">
            {t("footer.tagline")}
          </p>
          <p className="mt-4 flex max-w-[480px] items-start justify-center gap-2.5 text-[13.5px] leading-relaxed text-white/50">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{t("footer.areaValue")}</span>
          </p>
        </div>

        {/* Colonnes : empilées en mobile, alignées sur une ligne dès `sm`. */}
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {/* Navigation */}
          <div>
            <p className="text-mv-lime mb-4 text-[11px] font-extrabold tracking-[0.14em] uppercase">
              {t("footer.navTitle")}
            </p>
            <nav aria-label={t("footer.navTitle")} className="flex flex-col gap-[11px]">
              {NAV.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Réseaux */}
          <div>
            <p className="text-mv-lime mb-4 text-[11px] font-extrabold tracking-[0.14em] uppercase">
              {t("footer.followTitle")}
            </p>
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
              {/* Facebook n'apparaît que si l'URL est renseignée : un lien mort en pied
                  de page est un signal de négligence (audit P0 #8). */}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  {t("footer.facebook")}
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-mv-lime mb-4 text-[11px] font-extrabold tracking-[0.14em] uppercase">
              {t("footer.contactTitle")}
            </p>
            <div className="flex flex-col gap-[11px]">
              {/* `break-all` retiré : la colonne est désormais assez large,
                  l'adresse ne se coupe plus au milieu d'un mot. */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[14.5px] text-white/80 transition-colors hover:text-white"
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
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-white/40">{t("footer.rights", { year })}</p>
            <p className="text-[13px] text-white/40">
              {t("footer.credits")}{" "}
              <a
                href={`mailto:${siteCredits.email}`}
                className="text-white/60 transition-colors hover:text-white"
              >
                {siteCredits.name}
              </a>
            </p>
          </div>
          <div className="flex gap-5">
            <Link
              href="/mentions-legales"
              className="text-[13px] text-white/60 transition-colors hover:text-white"
            >
              {t("footer.legal")}
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-[13px] text-white/60 transition-colors hover:text-white"
            >
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

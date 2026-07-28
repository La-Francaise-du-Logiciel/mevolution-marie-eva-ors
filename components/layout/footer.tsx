import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/brand/container";
import { CalendlyLink } from "@/components/brand/calendly-link";
import { siteConfig } from "@/lib/site";
import { NavLink } from "./nav-link";
import { NAV } from "./nav-items";

/** Pied de page commun (vert très foncé), grille 4 colonnes → empilé en mobile. */
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
          <CalendlyLink
            location="footer"
            aria-label={t("common.ctaAria")}
            className="bg-mv-lime text-mv-forest-deep inline-flex flex-none items-center gap-2 rounded-full px-7 py-4 text-[15px] font-bold transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t("common.ctaBook")}
            <ArrowRight className="size-[17px]" aria-hidden="true" />
          </CalendlyLink>
        </div>
      </Container>

      <Container className="pt-12 pb-10 md:pt-14">
        {/*
          Trois dispositions :
          — mobile  : tout empilé (1 colonne) ;
          — tablette: la marque occupe toute la largeur, puis Navigation / Suivez-moi /
                      Contact restent alignés sur une ligne ;
          — desktop : 4 colonnes, la dernière élargie pour que l'adresse email
                      tienne sur une seule ligne (elle revenait à la ligne).
        */}
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.35fr] lg:grid-cols-[1.25fr_.85fr_.85fr_1.25fr]">
          {/* Marque */}
          <div className="md:col-span-3 lg:col-span-1">
            <Image
              src="/assets/logo-dark.svg"
              alt={t("nav.logoAlt")}
              width={225}
              height={90}
              className="h-[44px] w-auto brightness-0 invert"
              unoptimized
            />
            <p className="mt-4 max-w-[320px] text-[15px] leading-relaxed text-white/60">
              {t("footer.tagline")}
            </p>
            <p className="mt-5 flex max-w-[420px] items-start gap-2.5 text-[13.5px] leading-relaxed text-white/50">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{t("footer.areaValue")}</span>
            </p>
          </div>

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
          <p className="text-[13px] text-white/40">{t("footer.rights", { year })}</p>
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

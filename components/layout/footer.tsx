import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/brand/container";
import { QualiopiCertification } from "@/components/brand/qualiopi-certification";
import { siteConfig, siteCredits } from "@/lib/site";
import { NavLink } from "./nav-link";
import { NAV } from "./nav-items";

/** Pied de page commun (vert très foncé) : marque puis navigation compacte et coordonnées. */
export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mv-forest-deep text-white">
      {/* Dernier appel à l'action : le footer était purement navigationnel (audit §5.2). */}
      <Container className="border-b border-white/10 py-8 md:py-12">
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

      <Container className="pt-6 pb-8 md:pt-8 md:pb-10">
        <Image
          src="/assets/logo-dark.svg"
          alt={t("nav.logoAlt")}
          width={225}
          height={90}
          className="mx-auto h-[56px] w-auto brightness-0 invert md:mx-0 md:h-[72px]"
          unoptimized
        />

        {/* La certification rejoint les informations du footer sans concurrencer la marque. */}
        <div className="mt-8 grid grid-cols-2 gap-7 sm:grid-cols-3 sm:gap-10 md:mt-10 md:grid-cols-4">
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
          <div className="col-span-2 sm:col-span-1">
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

          {/* Certification */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <p className="text-mv-lime mb-4 text-[11px] font-extrabold tracking-[0.14em] uppercase">
              {t("footer.certificationTitle")}
            </p>
            <QualiopiCertification
              compact
              className="max-w-[190px] shadow-none sm:mx-auto md:mx-0"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 sm:mt-11 sm:flex-row sm:items-center sm:pt-6">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-white/40">{t("footer.rights", { year })}</p>
            <p className="text-[13px] text-white/40">
              {t("footer.credits")}{" "}
              <a
                href={siteCredits.url}
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

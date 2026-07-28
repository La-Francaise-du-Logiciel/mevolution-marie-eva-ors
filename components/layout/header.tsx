"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/brand/container";
import { Button } from "@/components/ui/button";
import { CalendlyLink } from "@/components/brand/calendly-link";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { NAV } from "./nav-items";

/** En-tête sticky : ombre au scroll, nav active, CTA. */
export function Header() {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "bg-mv-cream/80 sticky top-0 z-[60] border-b border-[#eae2d4] backdrop-blur-[14px] transition-shadow duration-300",
        scrolled && "shadow-[0_12px_34px_-20px_rgba(8,59,53,0.55)]"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[78px] lg:gap-9">
        <Link href="/" aria-label={t("logoAlt")} className="flex flex-none items-center">
          <Image
            src="/assets/logo-dark.svg"
            alt={t("logoAlt")}
            width={225}
            height={90}
            priority
            // Logo agrandi (demande cliente) — `w-auto` conserve le ratio 225×90.
            className="h-[36px] w-auto lg:h-11"
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <NavLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-3 py-[9px] text-[15px] font-bold transition-colors xl:px-4",
                  active ? "text-mv-ink" : "text-mv-ink hover:text-mv-grape"
                )}
              >
                {t(item.navKey)}
                {active && (
                  <span className="bg-mv-grape absolute inset-x-3 bottom-px h-[2.5px] rounded-full xl:inset-x-4" />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex flex-none items-center gap-2 lg:gap-3">
          {/* CTA permanent, mobile ET desktop (audit P0 #7 : il était masqué sous 1024px,
              privant de CTA persistant la majorité du trafic). Libellé court tant que
              la place manque, complet à partir de xl. */}
          <Button asChild variant="primary" size="sm">
            <CalendlyLink location="header" aria-label={common("ctaAria")}>
              <span className="xl:hidden">{t("ctaShort")}</span>
              <span className="hidden xl:inline">{t("cta")}</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </CalendlyLink>
          </Button>
          <MobileNav nav={NAV} />
        </div>
      </Container>
    </header>
  );
}

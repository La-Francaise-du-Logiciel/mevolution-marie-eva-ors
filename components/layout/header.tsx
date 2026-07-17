"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/brand/container";
import { Button } from "@/components/ui/button";
import { CalendlyLink } from "@/components/brand/calendly-link";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { NAV } from "./nav-items";

/** En-tête sticky : ombre au scroll, nav active, CTA. */
export function Header() {
  const t = useTranslations("nav");
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
            className="h-[30px] w-auto lg:h-9"
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-4 py-[9px] text-[15px] font-bold transition-colors",
                  active ? "text-mv-ink" : "text-mv-ink hover:text-mv-grape"
                )}
              >
                {t(item.key)}
                {active && (
                  <span className="bg-mv-grape absolute inset-x-4 bottom-px h-[2.5px] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-none items-center gap-2 lg:gap-3">
          {/* Sélecteur FR/EN désactivé (site en français). Pour le réactiver :
              réimporter LocaleSwitcher (./locale-switcher) et remettre <LocaleSwitcher /> ici. */}
          <Button asChild variant="primary" size="sm" className="hidden lg:inline-flex">
            <CalendlyLink location="header" aria-label={t("cta")}>
              {t("cta")}
              <ArrowRight className="size-4" />
            </CalendlyLink>
          </Button>
          <MobileNav nav={NAV} />
        </div>
      </Container>
    </header>
  );
}

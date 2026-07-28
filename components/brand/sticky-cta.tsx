"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CalendlyLink } from "./calendly-link";

/**
 * Barre CTA collante, mobile uniquement (audit P0 #7).
 *
 * Apparaît après ~40 % de défilement pour ne pas concurrencer le CTA du hero,
 * et se masque en fin de page pour laisser respirer le footer et son propre CTA.
 * Masquée en `lg:` — le header desktop porte déjà un CTA permanent.
 */
export function StickyCta() {
  const t = useTranslations("stickyCta");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) return;
      const ratio = scrolled / height;
      setVisible(ratio > 0.4 && ratio < 0.94);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "bg-mv-cream/95 fixed inset-x-0 bottom-0 z-[70] border-t border-[#eae2d4] px-4 pt-3 backdrop-blur-md transition-[transform,opacity] duration-300 lg:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
      // Retiré de l'ordre de tabulation quand la barre est masquée.
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-2.5">
        <CalendlyLink
          location="sticky-mobile"
          className="bg-mv-grape inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-[15px] text-[15px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(136,72,154,0.9)]"
        >
          {t("label")}
          <ArrowRight className="size-[17px]" />
        </CalendlyLink>
        <a
          href={siteConfig.phoneHref}
          aria-label={t("call")}
          className="border-mv-forest/25 text-mv-forest inline-flex size-[50px] flex-none items-center justify-center rounded-full border-[1.5px] bg-white"
        >
          <Phone className="size-5" />
        </a>
      </div>
    </div>
  );
}

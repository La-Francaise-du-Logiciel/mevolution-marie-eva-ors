"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Bascule FR / EN en conservant la page courante. */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="border-mv-line flex items-center rounded-full border bg-white/60 p-0.5 text-[12px] font-bold"
    >
      {routing.locales.map((loc) => {
        const active = locale === loc;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 tracking-wide uppercase transition-colors",
              active ? "bg-mv-grape text-white" : "text-mv-stone hover:text-mv-grape"
            )}
          >
            {t(loc)}
          </Link>
        );
      })}
    </div>
  );
}

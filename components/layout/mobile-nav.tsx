"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendlyLink } from "@/components/brand/calendly-link";
import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";

type NavItem = { href: string; key: string };

/** Menu mobile plein écran (Radix Dialog) déclenché par le bouton hamburger. */
export function MobileNav({ nav }: { nav: readonly NavItem[] }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={t("openMenu")}
          className="text-mv-ink hover:text-mv-grape inline-flex size-11 items-center justify-center rounded-xl transition-colors lg:hidden"
        >
          <Menu className="size-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="mv-menu-overlay bg-mv-cream/40 fixed inset-0 z-[80] backdrop-blur-sm lg:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="mv-menu-panel bg-mv-cream fixed inset-0 z-[90] flex flex-col px-5 pt-4 pb-8 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="sr-only">{t("menuTitle")}</Dialog.Title>
            <Image
              src="/assets/logo-dark.svg"
              alt={t("logoAlt")}
              width={225}
              height={90}
              className="h-[30px] w-auto"
              unoptimized
            />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={t("closeMenu")}
                className="text-mv-ink inline-flex size-[38px] items-center justify-center rounded-full bg-[#efe7db] transition-colors hover:bg-[#e6dccb]"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Dialog.Close asChild key={item.href}>
                  <NavLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-2xl px-4 py-4 font-serif text-[26px] font-medium transition-colors",
                      active ? "text-mv-grape" : "text-mv-ink hover:text-mv-grape"
                    )}
                  >
                    {t(item.key)}
                  </NavLink>
                </Dialog.Close>
              );
            })}
          </nav>

          <div className="mt-auto pt-8">
            <Button asChild variant="primary" size="block">
              <CalendlyLink
                location="mobile-menu"
                onClick={() => setOpen(false)}
                aria-label={t("cta")}
              >
                {t("cta")}
                <ArrowRight className="size-[18px]" />
              </CalendlyLink>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

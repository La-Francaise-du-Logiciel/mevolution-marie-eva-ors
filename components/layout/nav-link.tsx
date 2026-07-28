"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = ComponentProps<typeof Link>;

/**
 * Comme next/link, mais si le lien pointe vers la page déjà affichée,
 * remonte en haut de la page au lieu de ne rien faire (un <Link> ne
 * déclenche aucune navigation, ni scroll, vers la route déjà active).
 */
export function NavLink({ href, onClick, ...props }: Props) {
  const pathname = usePathname();
  const isCurrent = typeof href === "string" && pathname === href;

  return (
    <Link
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        if (isCurrent) {
          event.preventDefault();
          const reduceMotion =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        }
        onClick?.(event);
      }}
      {...props}
    />
  );
}

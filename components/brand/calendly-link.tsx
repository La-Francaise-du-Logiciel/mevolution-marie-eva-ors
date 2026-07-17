"use client";

import { forwardRef, type ComponentProps, type MouseEvent } from "react";

import { siteConfig } from "@/lib/site";
import { track } from "@/lib/analytics";

type CalendlyLinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** Emplacement du CTA (pour l'analytics : hero, header, band, contact…). */
  location?: string;
};

/**
 * Lien vers l'entretien découverte Calendly.
 * Ouvre un nouvel onglet et déclenche un événement PostHog au clic.
 */
export const CalendlyLink = forwardRef<HTMLAnchorElement, CalendlyLinkProps>(function CalendlyLink(
  { location = "unknown", onClick, children, ...props },
  ref
) {
  return (
    <a
      ref={ref}
      href={siteConfig.calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        track("cta_calendly_click", { location });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
});

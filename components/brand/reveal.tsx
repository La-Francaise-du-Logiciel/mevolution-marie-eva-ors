"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Délai en millisecondes (effet cascade : 0 / 90 / 120…). */
  delay?: number;
  className?: string;
};

/**
 * Révèle un bloc au scroll (opacity + translateY) — **visible par défaut**.
 *
 * L'animation se déclenche pile au moment où l'utilisateur scrolle jusqu'au bloc,
 * jamais hors écran :
 * - Un bloc déjà (même partiellement) visible au chargement s'affiche tel quel, sans animation.
 * - Un bloc entièrement sous la ligne de flottaison est masqué (hors écran, donc sans flash),
 *   puis animé quand il entre dans le viewport (IntersectionObserver).
 * - Le contenu ne dépend JAMAIS du JS pour s'afficher : sans JS, JS bloqué (accès dev via IP LAN)
 *   ou reduced-motion → tout reste visible.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion ou pas d'IntersectionObserver → on ne masque rien.
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    // On n'anime QUE les blocs entièrement sous la ligne de flottaison.
    // Ceux déjà visibles au chargement restent affichés (pas d'animation « perdue »).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    // Masqué hors écran (aucun flash), puis révélé quand l'utilisateur scrolle jusqu'à lui.
    el.classList.add("mv-reveal-armed");
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.remove("mv-reveal-armed");
          io.disconnect();
        }
      },
      // Se déclenche quand le bloc arrive à ~10 % du bas de l'écran.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("mv-reveal", className)}>
      {children}
    </div>
  );
}

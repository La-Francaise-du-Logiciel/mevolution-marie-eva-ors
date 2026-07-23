import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type GlowProps = {
  /** Couleur (idéalement une valeur rgba pour un dégradé doux). */
  color: string;
  /** Diamètre en px. */
  size?: number;
  /** Décalage de l'animation en secondes (évite un mouvement synchrone entre halos). */
  delay?: number;
  className?: string;
};

/**
 * Halo discret et dynamique placé derrière un visuel (ex. photo hero) :
 * une tache de couleur floue qui respire lentement. Remplace le motif
 * « feuille » flottant, plus discret et moins graphique.
 */
export function Glow({ color, size = 220, delay = 0, className }: GlowProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    background: color,
    animationDelay: `${delay}s`,
  };

  return <span aria-hidden="true" className={cn("mv-glow", className)} style={style} />;
}

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type LeafProps = {
  /** Côté du losange en px. */
  size?: number;
  className?: string;
  /** Animation flottante des feuilles hero. */
  float?: "up" | "down";
  style?: CSSProperties;
};

/**
 * Motif « feuille » — signature de marque.
 * Losange arrondi asymétrique (border-radius 0 100% 0 100% + rotate 45°).
 */
export function Leaf({ size = 14, className, float, style }: LeafProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mv-leaf inline-block",
        float === "up" && "animate-leaf-float",
        float === "down" && "animate-leaf-float-slow",
        className
      )}
      style={{ width: size, height: size, ...style }}
    />
  );
}

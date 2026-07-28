import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarsProps = {
  /** Note sur 5. */
  rating: number;
  /** Libellé lu par les lecteurs d'écran (les étoiles elles-mêmes sont décoratives). */
  label: string;
  size?: number;
  className?: string;
};

/**
 * Note en étoiles.
 *
 * Rendu en violet de marque (`mv-grape`) plutôt qu'en doré : c'est la couleur
 * d'accent du site, elle contraste fortement sur les cartes blanches et reste
 * cohérente avec l'identité. Passer en doré ne demanderait qu'un changement
 * de classe ici (voir la note de livraison).
 */
export function Stars({ rating, label, size = 18, className }: StarsProps) {
  const rounded = Math.round(rating);

  return (
    <span className={cn("inline-flex items-center gap-1", className)} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          style={{ width: size, height: size }}
          className={cn(
            "shrink-0",
            index < rounded ? "fill-mv-grape text-mv-grape" : "text-mv-line-strong fill-transparent"
          )}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

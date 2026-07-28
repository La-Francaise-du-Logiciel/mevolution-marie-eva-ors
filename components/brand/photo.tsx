import Image from "next/image";

import { cn } from "@/lib/utils";

type PhotoProps = {
  /** Chemin public de l'image (ex. "/photos/mareva-portrait.jpg"). `null` → cadre de marque. */
  src: string | null;
  /** Texte alternatif — décrit la personne et le contexte (SEO + accessibilité). */
  alt: string;
  tone?: "green" | "violet";
  /** `true` pour l'image du hero (LCP) : préchargée, jamais en lazy. */
  priority?: boolean;
  /** Tailles responsives passées à next/image (évite de télécharger du 2000px sur mobile). */
  sizes?: string;
  className?: string;
  /** Libellé affiché dans le cadre tant qu'aucune photo n'est fournie. */
  pendingLabel?: string;
};

const TONES = {
  green: {
    image: "repeating-linear-gradient(135deg,#eaf1ee 0 16px,#e1ebe6 16px 32px)",
    border: "#d7e4de",
    shadow: "shadow-[0_40px_80px_-50px_rgba(8,59,53,0.6)]",
    text: "text-[#66766f]",
  },
  violet: {
    image: "repeating-linear-gradient(135deg,#f3ecf6 0 16px,#ece0f2 16px 32px)",
    border: "#e2d3ea",
    shadow: "shadow-[0_40px_80px_-50px_rgba(136,72,154,0.5)]",
    text: "text-[#8a6f97]",
  },
} as const;

/**
 * Photo de marque, cadrage 4:5.
 *
 * Rend une vraie image optimisée (`next/image` → AVIF/WebP, tailles responsives,
 * `priority` pour le LCP du hero). Tant que le chemin n'est pas renseigné dans
 * `lib/site.ts → photos`, on affiche le cadre de marque plutôt qu'une image cassée :
 * déposer le fichier dans `public/photos/` et renseigner la constante suffit à basculer.
 */
export function Photo({
  src,
  alt,
  tone = "green",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 560px",
  className,
  pendingLabel,
}: PhotoProps) {
  const t = TONES[tone];

  if (src) {
    return (
      <div
        className={cn(
          "relative z-[1] aspect-[4/5] w-full overflow-hidden rounded-[28px]",
          t.shadow,
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative z-[1] flex aspect-[4/5] w-full items-center justify-center rounded-[28px] border p-6 text-center",
        t.shadow,
        className
      )}
      style={{ backgroundImage: t.image, borderColor: t.border }}
    >
      {pendingLabel && (
        <span className={cn("font-mono text-[13px] leading-relaxed", t.text)}>{pendingLabel}</span>
      )}
    </div>
  );
}

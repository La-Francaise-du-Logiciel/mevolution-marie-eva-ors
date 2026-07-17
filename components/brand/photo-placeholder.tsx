import { cn } from "@/lib/utils";

type PhotoPlaceholderProps = {
  tone?: "green" | "violet";
  label: string;
  className?: string;
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

/** Zone photo placeholder 4:5 (à remplacer par une vraie image avant mise en ligne). */
export function PhotoPlaceholder({ tone = "green", label, className }: PhotoPlaceholderProps) {
  const t = TONES[tone];
  return (
    <div
      className={cn(
        "relative z-[1] flex aspect-[4/5] items-center justify-center rounded-[28px] border p-6 text-center",
        t.shadow,
        className
      )}
      style={{ backgroundImage: t.image, borderColor: t.border }}
    >
      <span className={cn("font-mono text-[13px] leading-relaxed whitespace-pre-line", t.text)}>
        {label}
      </span>
    </div>
  );
}

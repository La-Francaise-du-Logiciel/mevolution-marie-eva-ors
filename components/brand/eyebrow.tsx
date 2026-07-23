import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  tone?: "forest" | "lime";
  className?: string;
};

/** Surtitre (eyebrow) : 12px, 800, uppercase, letter-spacing .16em. */
export function Eyebrow({ children, tone = "forest", className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "text-[12px] font-extrabold tracking-[0.16em] uppercase",
        tone === "lime" ? "text-mv-lime" : "text-mv-forest",
        className
      )}
    >
      {children}
    </div>
  );
}

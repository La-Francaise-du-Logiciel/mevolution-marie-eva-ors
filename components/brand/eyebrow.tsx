import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Leaf } from "./leaf";

type EyebrowProps = {
  children: ReactNode;
  tone?: "forest" | "lime";
  withLeaf?: boolean;
  className?: string;
};

/** Surtitre (eyebrow) : 12px, 800, uppercase, letter-spacing .16em, avec feuille lime. */
export function Eyebrow({ children, tone = "forest", withLeaf = true, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-[9px] text-[12px] font-extrabold tracking-[0.16em] uppercase",
        tone === "lime" ? "text-mv-lime" : "text-mv-forest",
        className
      )}
    >
      {withLeaf && <Leaf size={13} className="bg-mv-lime" />}
      <span>{children}</span>
    </div>
  );
}

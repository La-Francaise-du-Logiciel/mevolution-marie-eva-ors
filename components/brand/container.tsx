import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Conteneur centré : max-width 1180px, padding 20px (mobile) → 48px (desktop). */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1180px] px-5 md:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}

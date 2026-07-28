import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-mv-cream disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      // Le mouvement de survol vient de `.mv-lift` (globals.css), identique pour
      // toutes les variantes. Chaque variante ne définit que sa couleur et l'ombre
      // qui lui convient. `link` est un lien texte : il ne se soulève pas.
      variant: {
        primary:
          "mv-lift bg-mv-grape text-white shadow-[0_16px_30px_-14px_rgba(136,72,154,0.85)] hover:bg-mv-grape-dark [--mv-lift-shadow:0_26px_44px_-16px_rgba(136,72,154,0.9)]",
        outline:
          "mv-lift border-[1.5px] border-mv-forest/30 bg-transparent text-mv-forest hover:border-mv-forest/55 hover:bg-mv-forest/[0.06] [--mv-lift-shadow:0_22px_40px_-28px_rgba(0,91,82,0.6)]",
        white:
          "mv-lift bg-white text-mv-grape [--mv-lift-shadow:0_24px_40px_-18px_rgba(0,0,0,0.4)]",
        link: "rounded-none p-0 font-bold text-mv-grape transition-colors duration-300 hover:text-mv-grape-dark",
      },
      size: {
        sm: "px-5 py-3 text-sm",
        md: "px-[26px] py-[15px] text-[15px]",
        lg: "px-[30px] py-[17px] text-base",
        block: "w-full px-6 py-[17px] text-base",
        none: "",
      },
    },
    compoundVariants: [
      { variant: "link", size: ["sm", "md", "lg", "block"], className: "px-0 py-0" },
    ],
    defaultVariants: { variant: "primary", size: "lg" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "border-mv-input bg-mv-cream-soft text-mv-ink placeholder:text-mv-stone-3 focus:border-mv-grape aria-[invalid=true]:border-destructive w-full rounded-xl border px-[15px] py-[14px] font-sans text-[15px] transition-colors outline-none focus:bg-white disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

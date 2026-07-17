import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "border-mv-input bg-mv-cream-soft text-mv-ink placeholder:text-mv-stone-3 focus:border-mv-grape aria-[invalid=true]:border-destructive w-full resize-y rounded-xl border px-[15px] py-[14px] font-sans text-[15px] leading-relaxed transition-colors outline-none focus:bg-white disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

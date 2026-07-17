"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-mv-line !bg-white !text-mv-ink !font-sans !shadow-[0_20px_50px_-24px_rgba(8,59,53,0.5)]",
          title: "!font-bold !text-[14px]",
          description: "!text-mv-stone !text-[13px]",
          success: "!text-mv-forest",
          error: "!text-destructive",
        },
      }}
      {...props}
    />
  );
}

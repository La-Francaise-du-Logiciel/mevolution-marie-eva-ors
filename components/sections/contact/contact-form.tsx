"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { ArrowRight, Check, Lock } from "lucide-react";

import { createContactSchema, type ContactFormValues } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function SuccessCard() {
  const t = useTranslations("form.success");
  return (
    <div className="bg-mv-forest rounded-[26px] p-12 text-center md:p-16">
      <div className="bg-mv-lime text-mv-forest mx-auto mb-6 inline-flex size-[66px] items-center justify-center rounded-full">
        <Check className="size-8" strokeWidth={3} />
      </div>
      <h2 className="mb-3 font-serif text-[26px] font-medium text-white md:text-[30px]">
        {t("title")}
      </h2>
      <p className="text-[17px] leading-[1.6] text-white/85">{t("text")}</p>
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const [sent, setSent] = useState(false);

  const schema = createContactSchema({
    name: t("errors.name"),
    email: t("errors.email"),
    message: t("errors.message"),
    messageShort: t("errors.messageShort"),
    consent: t("errors.consent"),
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      company: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      track("contact_form_submitted");
      form.reset();
      setSent(true);
      toast.success(t("toast.success"));
    } catch {
      track("contact_form_error");
      toast.error(t("toast.error"));
    }
  }

  if (sent) {
    return <SuccessCard />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="border-mv-line rounded-[26px] border bg-white p-7 shadow-[0_24px_46px_-34px_rgba(0,91,82,0.4)] md:p-9"
      >
        <h2 className="mb-6 font-serif text-[26px] font-medium md:text-[28px]">{t("title")}</h2>

        {/* Honeypot anti-spam (masqué visuellement) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] size-0 overflow-hidden"
        >
          <label>
            Company
            <input type="text" tabIndex={-1} autoComplete="off" {...form.register("company")} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("name")} <span className="text-mv-grape">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("namePlaceholder")} autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("email")} <span className="text-mv-grape">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("phone")}{" "}
                  <span className="text-mv-stone-3 font-normal">({t("optional")})</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder={t("phonePlaceholder")}
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("message")} <span className="text-mv-grape">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder={t("messagePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="mt-5">
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(value) => field.onChange(value === true)}
                    className="mt-0.5"
                  />
                </FormControl>
                <FormLabel className="text-mv-stone-2 cursor-pointer text-[13px] leading-[1.55] font-normal">
                  {t("consent")}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="primary"
          size="block"
          className="mt-6"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            t("submitting")
          ) : (
            <>
              {t("submit")}
              <ArrowRight className="size-[18px]" />
            </>
          )}
        </Button>

        <p className="text-mv-stone-3 mt-4 flex items-center justify-center gap-2 text-center text-[12.5px]">
          <Lock className="size-3.5 shrink-0" />
          {t("secure")}
        </p>
      </form>
    </Form>
  );
}

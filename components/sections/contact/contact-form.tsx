"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";

import { createContactSchema, type ContactFormValues } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendlyLink } from "@/components/brand/calendly-link";
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
  const common = useTranslations("common");
  return (
    <div className="bg-mv-forest rounded-[26px] p-8 text-center md:p-16">
      <div className="bg-mv-lime text-mv-forest mx-auto mb-6 inline-flex size-[66px] items-center justify-center rounded-full">
        <Check className="size-8" strokeWidth={3} aria-hidden="true" />
      </div>
      <h2 className="mb-3 font-serif text-[26px] font-medium text-white md:text-[30px]">
        {t("title")}
      </h2>
      <p className="text-[17px] leading-[1.6] text-white/85">{t("text")}</p>
      {/* Le visiteur vient de convertir : on lui propose l'étape suivante
          plutôt que de le laisser sans action (audit §6.5). */}
      <p className="mt-7 text-[15px] text-white/70">{t("ctaIntro")}</p>
      <CalendlyLink
        location="form-success"
        aria-label={common("ctaAria")}
        className="bg-mv-lime text-mv-forest-deep mv-lift mt-3 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold [--mv-lift-shadow:0_22px_38px_-20px_rgba(8,59,53,0.55)]"
      >
        {common("ctaBook")}
        <ArrowRight className="size-[17px]" aria-hidden="true" />
      </CalendlyLink>
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("form");
  const situationOptions = t.raw("situationOptions") as string[];
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
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      situation: "",
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
        id="formulaire"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="border-mv-line rounded-[26px] border bg-white p-5 shadow-[0_24px_46px_-34px_rgba(0,91,82,0.4)] md:p-9"
      >
        <h2 className="mb-5 font-serif text-[26px] font-medium md:mb-6 md:text-[28px]">
          {t("title")}
        </h2>

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

        {/* Qualification du lead : friction quasi nulle, gain net sur la préparation
            du premier entretien (audit §6.5). Champ optionnel. */}
        <div className="mt-4">
          <FormField
            control={form.control}
            name="situation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("situation")}{" "}
                  <span className="text-mv-stone-3 font-normal">({t("optional")})</span>
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border-mv-input focus-visible:border-mv-grape focus-visible:ring-ring h-[52px] w-full rounded-xl border bg-white px-4 text-[15px] focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <option value="">{t("situationPlaceholder")}</option>
                    {situationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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
                  {t.rich("consent", {
                    link: (chunks) => (
                      <Link
                        href="/politique-de-confidentialite"
                        className="text-mv-grape font-semibold underline underline-offset-2"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
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

        <p className="text-mv-stone-2 mt-4 text-center text-[13.5px] font-semibold">
          {t("responseTime")}
        </p>
        <p className="text-mv-stone-3 mt-2 flex items-center justify-center gap-2 text-center text-[12.5px]">
          <Lock className="size-3.5 shrink-0" aria-hidden="true" />
          {t("secure")}
        </p>
      </form>
    </Form>
  );
}

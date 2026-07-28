import { Calendar, Check, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/lib/site";
import { CalendlyLink } from "@/components/brand/calendly-link";

export function ContactInfo() {
  const t = useTranslations("contact");
  const common = useTranslations("common");
  const footer = useTranslations("footer");
  const nextSteps = t.raw("nextSteps.items") as string[];

  return (
    <div className="flex flex-col gap-4">
      <CalendlyLink
        location="contact-card"
        aria-label={common("ctaAria")}
        className="bg-mv-grape mv-lift flex items-center gap-[18px] rounded-[22px] p-6 text-white shadow-[0_20px_38px_-18px_rgba(136,72,154,0.9)] [--mv-lift-shadow:0_26px_44px_-16px_rgba(136,72,154,0.9)]"
      >
        <span className="inline-flex size-[54px] flex-none items-center justify-center rounded-[15px] bg-white/20">
          <Calendar className="size-6" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-[19px] font-extrabold">{t("calendlyCard.title")}</span>
          <span className="mt-0.5 block text-sm text-white/85">{t("calendlyCard.subtitle")}</span>
        </span>
      </CalendlyLink>

      {/* « Ce qui se passe ensuite » : lève l'anxiété du premier contact (audit §3.3). */}
      <div className="border-mv-line rounded-[18px] border bg-white p-[22px]">
        <h2 className="text-mv-forest mb-3 text-[11px] font-extrabold tracking-[0.12em] uppercase">
          {t("nextSteps.title")}
        </h2>
        <ol className="flex flex-col gap-2.5">
          {nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <Check
                className="text-mv-forest mt-0.5 size-4 shrink-0"
                strokeWidth={3}
                aria-hidden="true"
              />
              <span className="text-mv-stone text-[15px] leading-[1.55]">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <a
        href={`mailto:${siteConfig.email}`}
        className="border-mv-line hover:border-mv-line-strong mv-lift flex items-center gap-4 rounded-[18px] border bg-white p-[22px]"
      >
        <span className="bg-mv-pastel-violet text-mv-grape inline-flex size-12 flex-none items-center justify-center rounded-[14px]">
          <Mail className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="text-mv-stone-3 block text-[12px] font-semibold">{t("emailLabel")}</span>
          <span className="text-mv-grape block text-[17px] font-bold break-all">
            {siteConfig.email}
          </span>
        </span>
      </a>

      <a
        href={siteConfig.phoneHref}
        className="border-mv-line hover:border-mv-line-strong mv-lift flex items-center gap-4 rounded-[18px] border bg-white p-[22px]"
      >
        <span className="bg-mv-pastel-green text-mv-forest inline-flex size-12 flex-none items-center justify-center rounded-[14px]">
          <Phone className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="text-mv-stone-3 block text-[12px] font-semibold">{t("phoneLabel")}</span>
          <span className="text-mv-forest block text-[17px] font-bold">
            {siteConfig.phoneDisplay}
          </span>
        </span>
      </a>

      {/* Zone d'intervention : information locale rendue visible, plutôt qu'enterrée
          dans un paragraphe d'une page secondaire (audit §8.2). */}
      <div className="border-mv-line flex items-start gap-4 rounded-[18px] border bg-white p-[22px]">
        <span className="bg-mv-pastel-green text-mv-forest inline-flex size-12 flex-none items-center justify-center rounded-[14px]">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="text-mv-stone-3 block text-[12px] font-semibold">{t("areaLabel")}</span>
          <span className="text-mv-ink-soft block text-[15px] leading-[1.5] font-semibold">
            {t("areaValue")}
          </span>
        </span>
      </div>

      <div className="flex gap-3">
        <a
          href={siteConfig.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="border-mv-line hover:border-mv-grape hover:text-mv-grape flex-1 rounded-2xl border bg-white py-[15px] text-center text-sm font-bold transition-colors"
        >
          {footer("linkedin")}
        </a>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="border-mv-line hover:border-mv-grape hover:text-mv-grape flex-1 rounded-2xl border bg-white py-[15px] text-center text-sm font-bold transition-colors"
        >
          {footer("instagram")}
        </a>
        {/* Facebook n'apparaît que si l'URL est renseignée dans `lib/site.ts`
            (même règle que le footer : jamais de lien mort). */}
        {siteConfig.social.facebook && (
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="border-mv-line hover:border-mv-grape hover:text-mv-grape flex-1 rounded-2xl border bg-white py-[15px] text-center text-sm font-bold transition-colors"
          >
            {footer("facebook")}
          </a>
        )}
      </div>
    </div>
  );
}

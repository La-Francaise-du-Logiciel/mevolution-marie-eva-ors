import { Calendar, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/lib/site";
import { CalendlyLink } from "@/components/brand/calendly-link";

export function ContactInfo() {
  const t = useTranslations("contact");
  const common = useTranslations("common");
  const footer = useTranslations("footer");

  return (
    <div className="flex flex-col gap-4">
      <CalendlyLink
        location="contact-card"
        aria-label={common("ctaAria")}
        className="bg-mv-grape flex items-center gap-[18px] rounded-[22px] p-6 text-white shadow-[0_20px_38px_-18px_rgba(136,72,154,0.9)] transition-transform duration-300 hover:-translate-y-1"
      >
        <span className="inline-flex size-[54px] flex-none items-center justify-center rounded-[15px] bg-white/20">
          <Calendar className="size-6" />
        </span>
        <span>
          <span className="block text-[19px] font-extrabold">{t("calendlyCard.title")}</span>
          <span className="mt-0.5 block text-sm text-white/85">{t("calendlyCard.subtitle")}</span>
        </span>
      </CalendlyLink>

      <a
        href={`mailto:${siteConfig.email}`}
        className="border-mv-line hover:border-mv-line-strong flex items-center gap-4 rounded-[18px] border bg-white p-[22px] transition-[transform,border-color] duration-300 hover:-translate-y-0.5"
      >
        <span className="bg-mv-pastel-violet text-mv-grape inline-flex size-12 flex-none items-center justify-center rounded-[14px]">
          <Mail className="size-5" />
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
        className="border-mv-line hover:border-mv-line-strong flex items-center gap-4 rounded-[18px] border bg-white p-[22px] transition-[transform,border-color] duration-300 hover:-translate-y-0.5"
      >
        <span className="bg-mv-pastel-green text-mv-forest inline-flex size-12 flex-none items-center justify-center rounded-[14px]">
          <Phone className="size-5" />
        </span>
        <span>
          <span className="text-mv-stone-3 block text-[12px] font-semibold">{t("phoneLabel")}</span>
          <span className="text-mv-forest block text-[17px] font-bold">
            {siteConfig.phoneDisplay}
          </span>
        </span>
      </a>

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
      </div>
    </div>
  );
}

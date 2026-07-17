import { useTranslations } from "next-intl";

import { CenteredHero } from "@/components/sections/centered-hero";

export function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <CenteredHero
      eyebrow={t("eyebrow")}
      title={t.rich("title", {
        em: (chunks) => <em className="text-mv-grape italic">{chunks}</em>,
      })}
      lead={t("lead")}
    />
  );
}

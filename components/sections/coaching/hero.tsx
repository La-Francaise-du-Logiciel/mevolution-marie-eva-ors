import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import Link from "next/link";

import { CenteredHero } from "@/components/sections/centered-hero";
import { Button } from "@/components/ui/button";

export function CoachingHero() {
  const t = useTranslations("coaching.hero");
  const common = useTranslations("common");

  return (
    <CenteredHero
      eyebrow={t("eyebrow")}
      title={t.rich("title", {
        em: (chunks) => <em className="text-mv-grape italic">{chunks}</em>,
        mobileBreak: () => <br className="md:hidden" />,
      })}
      lead={t("lead")}
    >
      <Button asChild variant="primary" size="lg">
        <Link href="/contact">
          {common("cta")}
          <ArrowRight className="size-[18px]" />
        </Link>
      </Button>
    </CenteredHero>
  );
}

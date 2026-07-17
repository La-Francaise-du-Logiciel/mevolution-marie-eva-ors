import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/brand/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section>
      <Container className="flex min-h-[52vh] flex-col items-center justify-center py-24 text-center">
        <span className="text-mv-grape mb-4 font-serif text-[80px] leading-none font-medium">
          404
        </span>
        <h1 className="font-serif text-[32px] font-medium sm:text-[40px]">{t("title")}</h1>
        <p className="text-mv-stone mt-3 max-w-[440px]">{t("text")}</p>
        <Button asChild variant="primary" size="lg" className="mt-8">
          <Link href="/">
            {t("back")}
            <ArrowRight className="size-[18px]" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}

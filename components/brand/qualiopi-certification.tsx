import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type QualiopiCertificationProps = {
  className?: string;
  compact?: boolean;
  eager?: boolean;
};

const QUALIOPI_INFO_URL = "https://travail-emploi.gouv.fr/qualiopi-usage-de-la-marque";

/**
 * Marque Qualiopi non modifiée, accompagnée de la catégorie certifiée obligatoire.
 * Le cartouche blanc préserve le fond prévu par la charte graphique, y compris
 * lorsqu'il est affiché dans le footer sombre.
 */
export function QualiopiCertification({
  className,
  compact = false,
  eager = false,
}: QualiopiCertificationProps) {
  const t = useTranslations("qualiopi");

  return (
    <div
      className={cn(
        "border-mv-line rounded-[20px] border bg-white shadow-[0_18px_36px_-30px_rgba(0,0,0,0.45)]",
        compact ? "w-full max-w-[190px] rounded-[14px] p-3" : "w-full max-w-[320px] p-4 sm:p-5",
        className
      )}
    >
      <a
        href={QUALIOPI_INFO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("linkAria")}
        className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <Image
          src="/assets/qualiopi.svg"
          alt={t("logoAlt")}
          width={633}
          height={338}
          sizes={compact ? "166px" : "(max-width: 640px) 80vw, 280px"}
          className="mx-auto h-auto w-full"
          loading={eager ? "eager" : "lazy"}
          unoptimized
        />
      </a>
      <p
        className={cn(
          "text-mv-ink-soft border-mv-line border-t leading-[1.45]",
          compact ? "mt-2 pt-2 text-[9px]" : "mt-3 pt-3 text-[11.5px]"
        )}
      >
        {t("statement")}
        <span className="text-mv-ink mt-1 block font-extrabold tracking-[0.04em] uppercase">
          {t("category")}
        </span>
      </p>
    </div>
  );
}

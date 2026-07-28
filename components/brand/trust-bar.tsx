import { BadgeCheck, MapPin, ShieldCheck, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { credentials, keyFigures } from "@/lib/site";
import { Container } from "./container";

/**
 * Bandeau de confiance affiché juste sous le hero (audit §6.2).
 *
 * N'affiche QUE les éléments réellement renseignés dans `lib/site.ts` :
 * une certification non confirmée par la cliente n'apparaît pas.
 */
export function TrustBar() {
  const t = useTranslations("trustBar");

  const items: { icon: typeof BadgeCheck; label: string }[] = [];

  if (credentials.qualiopi) {
    items.push({ icon: ShieldCheck, label: credentials.qualiopi });
  }
  if (credentials.partner) {
    items.push({ icon: BadgeCheck, label: t("partner", { partner: credentials.partner }) });
  }
  if (credentials.cpfEligible) {
    items.push({ icon: ShieldCheck, label: t("cpf") });
  }
  items.push({ icon: MapPin, label: t("area") });
  if (keyFigures.reviewCount) {
    items.push({ icon: Star, label: t("reviews", { count: keyFigures.reviewCount }) });
  }

  if (items.length === 0) return null;

  return (
    <section className="border-y border-[#eae2d4] bg-white/55">
      <Container className="py-5 md:py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:gap-x-10">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className="text-mv-ink-soft flex items-center gap-2.5 text-[13.5px] font-semibold md:text-sm"
              >
                <Icon className="text-mv-forest size-[17px] shrink-0" strokeWidth={2.2} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

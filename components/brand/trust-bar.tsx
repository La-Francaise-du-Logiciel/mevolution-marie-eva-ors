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
    <section className="overflow-hidden border-y border-[#eae2d4] bg-white/55">
      <Container className="py-3.5 md:py-6">
        <div className="mv-trust-marquee-viewport mv-no-scrollbar -mx-5 overflow-hidden px-5 md:hidden">
          <div className="mv-trust-marquee flex w-max">
            {[false, true].map((isDuplicate, copyIndex) => (
              <ul
                key={copyIndex}
                aria-label={isDuplicate ? undefined : t("label")}
                aria-hidden={isDuplicate || undefined}
                className={`flex shrink-0 items-center gap-8 pr-8 md:gap-10 md:pr-10 ${
                  isDuplicate ? "mv-trust-marquee-copy" : ""
                }`}
              >
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={index}
                      className="text-mv-ink-soft flex flex-none items-center gap-2.5 text-[13.5px] font-semibold whitespace-nowrap md:text-sm"
                    >
                      <Icon className="text-mv-forest size-[17px] shrink-0" strokeWidth={2.2} />
                      <span>{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>

        <ul
          aria-label={t("label")}
          className="hidden flex-wrap items-center justify-center gap-x-10 gap-y-3 md:flex"
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className="text-mv-ink-soft flex items-center gap-2.5 text-sm font-semibold"
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

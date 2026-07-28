import { Clock, HeartHandshake, Lock, Unlock } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";

type Item = { title: string; text: string };

const ICONS = [Lock, Clock, Unlock, HeartHandshake];

/** « Mes engagements » : réassurance explicite avant l'appel à l'action (audit §7.6). */
export function Engagements() {
  const t = useTranslations("home.engagements");
  const items = t.raw("items") as Item[];

  return (
    <section>
      <Container className="pb-16 md:pb-20 lg:pb-[92px]">
        <Reveal className="mb-10 max-w-[640px] lg:mb-11">
          <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.12] font-medium sm:text-[38px] lg:text-[42px]">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <li key={index}>
                <Reveal delay={index * 80} className="h-full">
                  {/*
                    Grille plutôt que simple empilement : en mobile la carte occupe
                    toute la largeur, l'icône se place donc à côté du titre et le texte
                    passe dessous sur toute la largeur. Dès `sm` la grille repasse à une
                    colonne et retrouve l'empilement d'origine, qui convient aux cartes
                    étroites (2 colonnes en `sm`, 4 en `lg`).
                  */}
                  <div className="border-mv-line hover:border-mv-line-strong mv-lift grid h-full grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 rounded-[20px] border bg-white p-6 sm:grid-cols-1 sm:gap-y-2">
                    <span className="bg-mv-pastel-green text-mv-forest inline-flex size-11 items-center justify-center rounded-[13px] sm:mb-2">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-[17px] font-bold">{item.title}</h3>
                    <p className="text-mv-stone col-span-2 text-[15px] leading-[1.6] sm:col-span-1">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

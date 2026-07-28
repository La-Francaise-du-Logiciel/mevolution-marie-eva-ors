"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/brand/container";
import { Eyebrow } from "@/components/brand/eyebrow";
import { Reveal } from "@/components/brand/reveal";
import { Stars } from "@/components/brand/stars";
import { cn } from "@/lib/utils";

type Item = {
  quote: string;
  author: string;
  date: string;
  context: string;
  rating: number;
};

/**
 * Carrousel de témoignages.
 *
 * Défilement natif avec `scroll-snap` : il fonctionne au doigt, à la molette et
 * au clavier même sans JavaScript. Les boutons et les puces ne font que piloter
 * ce défilement — ils n'en sont jamais la condition.
 */
export function Temoignages() {
  const t = useTranslations("home.temoignages");
  const items = t.raw("items") as Item[];

  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [bounds, setBounds] = useState({ start: true, end: false });

  /** Recalcule la carte active et l'état des flèches à partir du défilement réel. */
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < min) {
        min = distance;
        closest = index;
      }
    });

    setActive(closest);
    setBounds({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  const step = useCallback(
    (direction: -1 | 1) => {
      scrollToCard(Math.min(Math.max(active + direction, 0), items.length - 1));
    },
    [active, items.length, scrollToCard]
  );

  return (
    <section id="temoignages" className="scroll-mt-20">
      <Container className="pb-16 md:pb-20 lg:pb-[92px]">
        <Reveal className="mb-9 lg:mb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[640px]">
              <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
              <h2 className="font-serif text-[30px] leading-[1.12] font-medium sm:text-[38px] lg:text-[42px]">
                {t("title")}
              </h2>
              <p className="text-mv-stone mt-3.5 text-[16px] leading-relaxed md:text-lg">
                {t("lead")}
              </p>
            </div>

            {/* Flèches — masquées au lecteur d'écran : le carrousel reste
                entièrement navigable au clavier via la liste elle-même. */}
            <div className="flex flex-none gap-2.5">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={bounds.start}
                aria-label={t("prev")}
                className="border-mv-line hover:border-mv-grape hover:text-mv-grape focus-visible:ring-ring focus-visible:ring-offset-mv-cream text-mv-ink inline-flex size-12 items-center justify-center rounded-full border bg-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={bounds.end}
                aria-label={t("next")}
                className="border-mv-line hover:border-mv-grape hover:text-mv-grape focus-visible:ring-ring focus-visible:ring-offset-mv-cream text-mv-ink inline-flex size-12 items-center justify-center rounded-full border bg-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul
            ref={trackRef}
            // `tabIndex` : la zone défilante doit être atteignable au clavier (WCAG 2.1.1).
            tabIndex={0}
            aria-label={t("carouselLabel")}
            className="mv-no-scrollbar focus-visible:ring-ring flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 focus-visible:ring-2 focus-visible:outline-none"
          >
            {items.map((item, index) => (
              <li
                key={index}
                className="w-[86%] flex-none snap-start sm:w-[62%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <figure className="border-mv-line hover:border-mv-line-strong flex h-full flex-col rounded-[22px] border bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_52px_-34px_rgba(8,59,53,0.5)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <Stars rating={item.rating} label={t("ratingLabel", { rating: item.rating })} />
                    <Quote
                      className="text-mv-grape/25 size-7 shrink-0"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </div>

                  <blockquote className="text-mv-ink-soft mb-6 text-[15.5px] leading-[1.7] whitespace-pre-line">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-auto flex items-center gap-3 border-t border-[#f0eae0] pt-5">
                    <span
                      aria-hidden="true"
                      className="bg-mv-pastel-violet text-mv-grape inline-flex size-10 flex-none items-center justify-center rounded-full font-serif text-[17px] font-medium"
                    >
                      {item.author.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="text-mv-ink block text-[15px] font-bold">{item.author}</span>
                      <span className="text-mv-stone-2 block text-[12.5px]">
                        {item.context} · {item.date}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="mt-7 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  aria-label={t("goTo", { index: index + 1 })}
                  aria-current={index === active ? "true" : undefined}
                  className={cn(
                    "focus-visible:ring-ring focus-visible:ring-offset-mv-cream h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    index === active
                      ? "bg-mv-grape w-7"
                      : "bg-mv-line-strong hover:bg-mv-stone-2 w-2"
                  )}
                />
              ))}
            </div>
            <p className="text-mv-stone-2 text-[13px]">{t("sourceLabel")}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

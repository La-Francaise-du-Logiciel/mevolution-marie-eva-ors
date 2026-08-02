"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
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

function ReviewCard({ item }: { item: Item }) {
  const t = useTranslations("home.temoignages");
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const measure = () => {
      const truncated = mobileQuery.matches && quote.scrollHeight > quote.clientHeight + 1;
      setIsTruncated(truncated);
      if (!mobileQuery.matches) setIsOpen(false);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(quote);
    mobileQuery.addEventListener("change", measure);

    return () => {
      resizeObserver.disconnect();
      mobileQuery.removeEventListener("change", measure);
    };
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative h-full">
        <figure className="border-mv-line hover:border-mv-line-strong mv-lift flex h-full flex-col rounded-[22px] border bg-white p-5 md:p-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Stars rating={item.rating} label={t("ratingLabel", { rating: item.rating })} />
            <Quote
              className="text-mv-grape/25 size-7 shrink-0"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </div>

          <blockquote
            ref={quoteRef}
            className="text-mv-ink-soft mb-5 line-clamp-6 text-[15.5px] leading-[1.6] whitespace-pre-line md:mb-6 md:line-clamp-none md:leading-[1.7]"
          >
            {item.quote}
          </blockquote>

          {isTruncated ? (
            <span
              aria-hidden="true"
              className="text-mv-grape -mt-2 mb-4 text-[13px] font-bold underline underline-offset-4 md:hidden"
            >
              {t("readMore")}
            </span>
          ) : null}

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

        {isTruncated ? (
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label={t("readFullReview", { author: item.author })}
              className="focus-visible:ring-mv-grape absolute inset-0 z-10 cursor-pointer rounded-[22px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
            />
          </Dialog.Trigger>
        ) : null}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="mv-menu-overlay fixed inset-0 z-[90] bg-[#0c332e]/55 backdrop-blur-sm md:hidden" />
        <Dialog.Content className="border-mv-line fixed top-1/2 left-1/2 z-[100] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[24px] border bg-white p-6 shadow-[0_30px_80px_-28px_rgba(12,51,46,0.75)] focus:outline-none md:hidden">
          <div className="mb-5 pr-12">
            <Dialog.Title className="font-serif text-[25px] leading-tight font-medium">
              {t("fullReviewTitle", { author: item.author })}
            </Dialog.Title>
            <p className="text-mv-stone-2 mt-1 text-[13px]">
              {item.context} · {item.date}
            </p>
            <div className="mt-3">
              <Stars rating={item.rating} label={t("ratingLabel", { rating: item.rating })} />
            </div>
          </div>

          <Dialog.Description asChild>
            <blockquote className="text-mv-ink-soft border-mv-grape/25 border-l-[3px] pl-4 text-[16px] leading-[1.7] whitespace-pre-line">
              {item.quote}
            </blockquote>
          </Dialog.Description>

          <Dialog.Close asChild>
            <button
              type="button"
              aria-label={t("closeReview")}
              className="border-mv-line text-mv-ink hover:text-mv-grape focus-visible:ring-mv-grape absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full border bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Carrousel de témoignages.
 *
 * Défilement natif avec `scroll-snap` : il fonctionne au doigt, à la molette et
 * au clavier même sans JavaScript. Les boutons et les puces ne font que piloter
 * ce défilement, ils n'en sont jamais la condition.
 *
 * La pagination raisonne en « pages » et non en cartes : le nombre de puces
 * dépend du nombre de cartes qui tiennent à l'écran (1 en mobile, 3 en desktop).
 */
export function Temoignages() {
  const t = useTranslations("home.temoignages");
  const items = t.raw("items") as Item[];

  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [pageCount, setPageCount] = useState(items.length);
  const [bounds, setBounds] = useState({ start: true, end: false });

  /** Nombre de cartes entièrement visibles, mesuré sur la mise en page réelle. */
  const measurePerView = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 1;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return 1;
    const stride =
      cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
    if (stride <= 0) return 1;
    const gap = stride - cards[0].offsetWidth;
    // +0.05 : tolérance d'arrondi sous-pixel (sinon 2.999… donnerait 2 cartes).
    return Math.max(1, Math.floor((track.clientWidth + gap) / stride + 0.05));
  }, []);

  /** Recalcule la page active, le nombre de pages et l'état des flèches. */
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const perView = measurePerView();
    const pages = Math.ceil(cards.length / perView);
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;

    // Première carte visible (alignement `snap-start`) → page correspondante.
    let closest = 0;
    let min = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < min) {
        min = distance;
        closest = index;
      }
    });

    setPageCount(pages);
    setActive(atEnd ? pages - 1 : Math.min(Math.floor(closest / perView), pages - 1));
    setBounds({ start: track.scrollLeft <= 4, end: atEnd });
  }, [measurePerView]);

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

  const scrollToPage = useCallback(
    (page: number) => {
      const track = trackRef.current;
      if (!track) return;
      const index = Math.min(page * measurePerView(), items.length - 1);
      const card = track.children[index] as HTMLElement | undefined;
      if (!card) return;
      const prefersReduced =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    },
    [items.length, measurePerView]
  );

  const step = useCallback(
    (direction: -1 | 1) => {
      scrollToPage(Math.min(Math.max(active + direction, 0), pageCount - 1));
    },
    [active, pageCount, scrollToPage]
  );

  return (
    <section id="temoignages" className="scroll-mt-20">
      <Container className="pb-12 md:pb-20 lg:pb-[92px]">
        <Reveal className="mb-7 md:mb-9 lg:mb-10">
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

            {/* Flèches : desktop uniquement (en mobile, le geste de balayage suffit).
                Masquées au lecteur d'écran : le carrousel reste entièrement
                navigable au clavier via la liste elle-même. */}
            <div className="hidden flex-none gap-2.5 md:flex">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={bounds.start}
                aria-label={t("prev")}
                className="border-mv-line hover:border-mv-grape hover:text-mv-grape focus-visible:ring-ring focus-visible:ring-offset-mv-cream text-mv-ink mv-lift inline-flex size-12 items-center justify-center rounded-full border bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={bounds.end}
                aria-label={t("next")}
                className="border-mv-line hover:border-mv-grape hover:text-mv-grape focus-visible:ring-ring focus-visible:ring-offset-mv-cream text-mv-ink mv-lift inline-flex size-12 items-center justify-center rounded-full border bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
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
            /*
              `overflow-x-auto` force le navigateur à calculer `overflow-y: auto` : la
              piste rogne donc tout ce qui dépasse verticalement, et tranchait net
              l'ombre portée des cartes au survol.

              La marge interne fait partie de la zone de rognage : c'est elle qui donne
              à l'ombre la place de s'étaler. 56 px en bas, car le flou de 52 px du
              `--mv-lift-shadow` laisse une traîne mesurée jusqu'à ~60 px sous la carte
              survolée ; 8 px en haut, la carte se soulevant de 4 px. Les marges
              négatives reprennent exactement l'espace ajouté : l'encombrement de la
              piste dans la page est identique à avant (8 px sous les cartes).
            */
            className="mv-no-scrollbar focus-visible:ring-ring -mt-2 -mb-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-2 pb-12 focus-visible:ring-2 focus-visible:outline-none md:-mb-12 md:gap-5 md:pb-14"
          >
            {items.map((item, index) => (
              <li
                key={index}
                className="w-[86%] flex-none snap-start sm:w-[62%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <ReviewCard item={item} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="mt-7 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToPage(index)}
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

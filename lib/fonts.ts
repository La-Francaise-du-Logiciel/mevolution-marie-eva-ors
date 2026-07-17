import { Newsreader, Mulish } from "next/font/google";

/** Titres — serif éditoriale, avec italique pour les mots accentués. */
export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

/** Corps / UI — sans-serif. */
export const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Contact · Mévolution";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Parlons de votre projet",
    subtitle: "Réservez un entretien découverte gratuit d'1 heure, sans engagement.",
  });
}

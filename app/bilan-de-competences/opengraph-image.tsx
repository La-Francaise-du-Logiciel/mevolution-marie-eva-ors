import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Bilan de compétences — Mévolution";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Bilan de compétences",
    subtitle: "Mobilisable via le CPF, méthode Orientaction. Strasbourg, Haguenau, Saverne.",
  });
}

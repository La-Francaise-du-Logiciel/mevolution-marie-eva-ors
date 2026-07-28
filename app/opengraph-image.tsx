import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Mévolution : coaching emploi & bilan de compétences";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Mévolution",
    subtitle: "Coaching emploi et bilan de compétences à Strasbourg, Haguenau et Saverne.",
  });
}

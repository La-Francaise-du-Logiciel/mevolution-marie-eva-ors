import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Coaching emploi · Mévolution";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Coaching emploi",
    subtitle: "De la galère à l'embauche : un accompagnement individuel en Alsace ou à distance.",
  });
}

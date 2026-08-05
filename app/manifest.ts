import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: "Coaching emploi et bilan de compétences avec Maréva Ors.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#f7f4ee",
    lang: "fr",
    icons: [
      {
        src: "/brand/favicon-mauve-64.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

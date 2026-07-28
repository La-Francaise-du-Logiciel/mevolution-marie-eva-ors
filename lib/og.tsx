import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { discoveryCall, photos, serviceArea, siteConfig } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

function Leaf({ size, color, rotate = 45 }: { size: number; color: string; rotate?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: "0 100% 0 100%",
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}

/**
 * Portrait inliné en data-URI : `next/og` s'exécute au build, sans réseau,
 * et ne peut donc pas résoudre une URL du site. On lit le fichier sur le disque.
 * Vignette dédiée (420×420, ~28 Ko) pour ne pas alourdir la génération.
 */
let portraitDataUri: string | null | undefined;

function getPortrait(): string | null {
  if (portraitDataUri !== undefined) return portraitDataUri;
  try {
    if (!photos.openGraph) {
      portraitDataUri = null;
      return null;
    }
    const file = readFileSync(join(process.cwd(), "public", photos.openGraph));
    portraitDataUri = `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    // Photo absente ou illisible : on retombe sur la version typographique seule.
    portraitDataUri = null;
  }
  return portraitDataUri;
}

/**
 * Image Open Graph de marque, déclinée par page (audit §8.8).
 * Une image unique pour tout le site sous-exploitait le partage LinkedIn,
 * probable canal principal de cette activité.
 */
export function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
  const portrait = getPortrait();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#f7f4ee",
        backgroundImage:
          "radial-gradient(circle at 12% 0%, rgba(136,72,154,0.10), transparent 45%), radial-gradient(circle at 95% 100%, rgba(0,91,82,0.10), transparent 45%)",
        padding: "72px 80px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Feuilles décoratives : placées hors de la zone du portrait pour
          ne pas être rognées par le cadre. */}
      <div style={{ position: "absolute", top: 52, left: 74, display: "flex" }}>
        <Leaf size={54} color="rgba(219,242,38,0.85)" />
      </div>
      <div style={{ position: "absolute", bottom: 62, left: 132, display: "flex" }}>
        <Leaf size={30} color="rgba(136,72,154,0.28)" />
      </div>

      {/* Colonne texte */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          paddingRight: portrait ? 56 : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#005b52",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <Leaf size={16} color="#dbf226" />
          <span>
            {siteConfig.founder} · {serviceArea.regionLarge}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: title.length > 30 ? 62 : 78,
            fontWeight: 700,
            color: "#1f2d29",
            letterSpacing: -2,
            lineHeight: 1.06,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 29,
            color: "#55625d",
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>

        <div style={{ display: "flex", marginTop: 36 }}>
          <div
            style={{
              display: "flex",
              padding: "13px 24px",
              background: "#88489a",
              color: "#fff",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {`Entretien gratuit · ${discoveryCall.durationLabelLong}`}
          </div>
        </div>
      </div>

      {/* Portrait : cadre 4:5 cohérent avec le reste du site */}
      {portrait && (
        <div
          style={{
            display: "flex",
            width: 340,
            height: 425,
            borderRadius: 28,
            overflow: "hidden",
            flexShrink: 0,
            border: "6px solid #ffffff",
            boxShadow: "0 30px 60px rgba(8,59,53,0.28)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portrait}
            alt=""
            width={340}
            height={425}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>,
    { ...OG_SIZE }
  );
}

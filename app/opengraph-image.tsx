import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mévolution — Consulting & Coaching";

function Leaf({ size: s, color, rotate = 45 }: { size: number; color: string; rotate?: number }) {
  return (
    <div
      style={{
        width: s,
        height: s,
        background: color,
        borderRadius: "0 100% 0 100%",
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}

export default function OpengraphImage() {
  const tagline = "Coaching emploi & bilan de compétences";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#f7f4ee",
        backgroundImage:
          "radial-gradient(circle at 12% 0%, rgba(136,72,154,0.10), transparent 45%), radial-gradient(circle at 95% 100%, rgba(0,91,82,0.10), transparent 45%)",
        padding: "80px 88px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: 80, right: 96, display: "flex" }}>
        <Leaf size={90} color="#dbf226" />
      </div>
      <div style={{ position: "absolute", bottom: 96, right: 190, display: "flex" }}>
        <Leaf size={46} color="rgba(136,72,154,0.35)" />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#005b52",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <Leaf size={18} color="#dbf226" />
        <span>{siteConfig.founder}</span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 104,
          fontWeight: 700,
          color: "#1f2d29",
          letterSpacing: -2,
        }}
      >
        Mévolution
      </div>

      <div style={{ display: "flex", marginTop: 20, fontSize: 40, color: "#55625d" }}>
        {tagline}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 56,
          alignItems: "center",
          gap: 14,
          fontSize: 24,
          color: "#88489a",
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "12px 24px",
            background: "#88489a",
            color: "#fff",
            borderRadius: 999,
          }}
        >
          Entretien découverte gratuit
        </div>
      </div>
    </div>,
    { ...size }
  );
}

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Autorise l'accès au serveur de DÉV depuis un autre appareil du réseau local
  // (ex. téléphone via http://192.168.x.x:3000). À adapter si l'IP du Mac change.
  // Alternative sans config : tester en mode production (`npm run build && npm run start`).
  allowedDevOrigins: ["192.168.1.134"],
};

export default withNextIntl(nextConfig);

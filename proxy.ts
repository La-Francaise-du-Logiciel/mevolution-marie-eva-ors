import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf : /api, les internes Next (_next, _vercel),
  // et les fichiers avec extension (favicon.svg, sitemap.xml, robots.txt…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

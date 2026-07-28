import { getRequestConfig } from "next-intl/server";

/**
 * Site en français uniquement : pas de routing i18n (aucun préfixe /fr, /en).
 * next-intl sert seulement à gérer les textes depuis messages/fr.json.
 */
export default getRequestConfig(async () => {
  const locale = "fr";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

# Variables de production — Scaleway

À renseigner dans les variables d’environnement du déploiement Scaleway. Les valeurs
`NEXT_PUBLIC_*` sont intégrées au JavaScript au moment du build : toute modification
nécessite donc un nouveau déploiement.

## Valeurs à configurer

| Variable                   | Valeur de production                                 |
| -------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | `https://www.mevolution-consulting.fr`               |
| `RESEND_API_KEY`           | La clé API de production créée dans Resend (`re_…`)  |
| `CONTACT_TO_EMAIL`         | `mevolution-consulting@outlook.fr`                   |
| `CONTACT_FROM_EMAIL`       | `Mévolution <contact@mevolution-consulting.fr>`      |
| `NEXT_PUBLIC_POSTHOG_KEY`  | La clé publique du projet PostHog Cloud EU (`phc_…`) |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://eu.i.posthog.com`                           |

`NODE_ENV=production`, `PORT` et `HOSTNAME` doivent rester pilotés par Scaleway, sauf
si le service les réclame explicitement. Ne jamais ajouter de clé secrète au dépôt.

## Resend

1. Vérifier `mevolution-consulting.fr` dans Resend (DNS SPF/DKIM).
2. Créer une clé limitée à l’envoi d’emails et la copier dans `RESEND_API_KEY`.
3. `CONTACT_FROM_EMAIL` doit utiliser le domaine vérifié. Tant que le domaine n’est
   pas validé, le formulaire renverra une erreur de livraison en production.

## PostHog sans cookies

1. Créer ou utiliser un projet **PostHog Cloud EU**.
2. Dans **Project Settings > Web analytics**, activer **Cookieless server hash mode**.
   Sans ce réglage côté PostHog, les événements envoyés en mode cookieless sont ignorés.
3. Copier la clé projet publique dans `NEXT_PUBLIC_POSTHOG_KEY`.

Le code impose `cookieless_mode: "always"` : aucun cookie, `localStorage` ou
`sessionStorage` PostHog n’est écrit. Autocapture, profils, replay, sondages, feature
flags et paramètres d’URL sont également désactivés.

## Contrôle après déploiement

- Envoyer un message test depuis `/contact` et vérifier sa réception.
- Ouvrir PostHog > Web analytics et vérifier l’arrivée d’une page vue.
- Dans les outils navigateur, vérifier que **Application > Cookies**, **Local Storage**
  et **Session Storage** restent vides après plusieurs navigations internes.

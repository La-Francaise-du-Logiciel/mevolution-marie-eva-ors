# Mévolution Consulting & Coaching

Site vitrine de **Mévolution Consulting & Coaching**, l'activité de **Maréva Ors**, conseillère en évolution professionnelle (coaching emploi + bilan de compétences).

Le site présente l'offre, la personne, et convertit vers un **entretien découverte gratuit d'1 heure** (Calendly) ou un formulaire de contact.

## Sommaire

- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Démarrage](#démarrage)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts](#scripts)
- [Structure du projet](#structure-du-projet)
- [Langue](#langue)
- [SEO](#seo)
- [Intégrations](#intégrations)
- [Déploiement](#déploiement)
- [À compléter avant la mise en ligne](#à-compléter-avant-la-mise-en-ligne)

## Stack technique

| Rôle          | Techno                                       |
| ------------- | -------------------------------------------- |
| Framework     | Next.js 16 (App Router, SSG)                 |
| Langage       | TypeScript (strict)                          |
| Styles        | Tailwind CSS v4 (design tokens CSS-first)    |
| Composants UI | Primitives type shadcn/ui (Radix + CVA)      |
| Textes        | next-intl (français, sans routing de langue) |
| Formulaires   | React Hook Form + Zod                        |
| Email         | Resend                                       |
| Analytics     | PostHog                                      |
| Animations    | IntersectionObserver + CSS (reveal robuste)  |
| Icônes        | lucide-react                                 |

## Prérequis

- **Node.js ≥ 20.9** (testé avec Node 26)
- npm (fourni avec Node)

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env.local
#    puis renseigner les valeurs (voir ci-dessous)

# 3. Lancer le serveur de développement
npm run dev
```

Le site est disponible sur <http://localhost:3000>.

> **Le formulaire de contact fonctionne sans clé Resend en développement** : le message n'est pas envoyé mais l'UI affiche l'état de succès (le message est loggé côté serveur).

## Variables d'environnement

Copier `.env.example` → `.env.local`.

| Variable                   | Requis    | Description                                                             |
| -------------------------- | --------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Prod      | URL de production, sans slash final (canonicals, OG, sitemap).          |
| `RESEND_API_KEY`           | Prod      | Clé API Resend **serveur** (jamais exposée au client).                  |
| `CONTACT_TO_EMAIL`         | Prod      | Adresse qui reçoit les messages du formulaire.                          |
| `CONTACT_FROM_EMAIL`       | Prod      | Expéditeur (domaine vérifié dans Resend), ex. `Mévolution <contact@…>`. |
| `NEXT_PUBLIC_POSTHOG_KEY`  | Optionnel | Clé projet PostHog. Sans elle, l'analytics est simplement désactivé.    |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optionnel | Hôte PostHog (par défaut `https://eu.i.posthog.com`).                   |

## Scripts

| Script              | Action                                |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Serveur de développement.             |
| `npm run build`     | Build de production.                  |
| `npm run start`     | Sert le build de production.          |
| `npm run lint`      | ESLint.                               |
| `npm run format`    | Formate le code avec Prettier.        |
| `npm run typecheck` | Vérification TypeScript sans émettre. |

## Structure du projet

```
app/
├── layout.tsx                # <html lang="fr">, polices, providers, header/footer, sticky CTA, JSON-LD
├── page.tsx                  # Accueil
├── coaching/page.tsx
├── bilan-de-competences/page.tsx
├── a-propos/page.tsx
├── contact/page.tsx
├── mentions-legales/page.tsx
├── politique-de-confidentialite/page.tsx
├── not-found.tsx
├── opengraph-image.tsx       # Image OG (1200×630), une par route
├── api/contact/route.ts      # Endpoint formulaire (Resend + rate limiting)
├── globals.css               # Tokens Tailwind v4 + base + animations
├── manifest.ts / robots.ts / sitemap.ts
└── providers.tsx             # PostHog + suivi des pages vues
components/
├── ui/                       # Primitives (button, input, form, checkbox…)
├── brand/                    # Leaf, Eyebrow, Reveal, CtaBand, Container…
├── layout/                   # Header, Footer, MobileNav
└── sections/                 # Sections par page (home/, coaching/, bilan/, about/, contact/, legal/)
i18n/                         # request.ts (config next-intl, français)
lib/                          # utils, site, seo, json-ld, og, schemas, analytics, rate-limit, fonts
messages/                     # fr.json (toute la copie)
public/                       # logo, favicon, assets de marque
```

### Pages & navigation

| Route                           | Contenu                                                                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                             | Hero, bandeau de confiance, Pour qui ?, Accompagnements, Coaching ou bilan ?, À propos + mission, Méthode, Engagements, Témoignages, FAQ, CTA |
| `/coaching`                     | Coaching emploi : promesses, 4 phases, modalités + tarif, histoire (frise), passerelle vers le bilan                                          |
| `/bilan-de-competences`         | Bilan de compétences : pourquoi / à qui, cadre pratique, confidentialité, citation, passerelle vers le coaching                               |
| `/a-propos`                     | Mission, parcours & expertise, cadre professionnel (page E-E-A-T)                                                                             |
| `/contact`                      | Calendly, « ce qui se passe ensuite », coordonnées, zone d'intervention, formulaire                                                           |
| `/mentions-legales`             | Mentions légales (`noindex`)                                                                                                                  |
| `/politique-de-confidentialite` | Politique de confidentialité RGPD (`noindex`)                                                                                                 |

Le contenu de `/coaching` et `/bilan-de-competences` est repris du site officiel existant (Google Sites), adapté au ton et à la mise en page du design.

## Langue

Site **100 % français**, sans routing de langue : les pages vivent à la racine (aucun préfixe `/fr`).

- Toute la copie vit dans `messages/fr.json`, gérée via next-intl en mode « sans i18n routing » (pratique pour centraliser et éditer les textes).
- Pour rajouter une langue plus tard : réintroduire le routing i18n de next-intl (segment `[locale]` + middleware) et un fichier `messages/en.json`.

## SEO

- `generateMetadata` par page : title, description, canonical, OG, Twitter cards.
- **JSON-LD** : `ProfessionalService` (avec `areaServed` local : Strasbourg, Haguenau, Saverne, Bas-Rhin…),
  `WebSite`, `Person`, `Service` + `Offer` (pages services), `FAQPage` (accueil + pages services), `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon SVG.
- Image Open Graph générée dynamiquement, **déclinée par page** (`lib/og.tsx` + `opengraph-image.tsx` par route).
- Rendu statique (SSG) : toutes les pages sont pré-générées en HTML.

## Intégrations

### Resend (email)

1. Créer un compte [Resend](https://resend.com) et **vérifier un domaine** d'envoi.
2. Renseigner `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
3. L'endpoint `POST /api/contact` valide (Zod), applique un **rate limiting** (5 requêtes / 10 min / IP), un **honeypot** anti-spam, puis envoie l'email (`replyTo` = email du visiteur).

### PostHog (analytics)

- Renseigner `NEXT_PUBLIC_POSTHOG_KEY` (+ `NEXT_PUBLIC_POSTHOG_HOST`).
- Pages vues suivies à chaque navigation ; événements personnalisés : `cta_calendly_click`
  (avec la propriété `location` : `hero`, `header`, `sticky-mobile`, `footer`, `comparaison`…),
  `contact_form_submitted`, `contact_form_error`.
- ⚠️ La **réservation Calendly effective** n'est pas encore suivie (redirection externe) :
  on mesure les clics, pas les rendez-vous pris. Cf. audit §5.2.

## Déploiement

Optimisé pour **Vercel** :

1. Importer le repo dans Vercel.
2. Renseigner les variables d'environnement (voir tableau).
3. Déployer (`npm run build` est détecté automatiquement).

Fonctionne sur toute plateforme supportant Next.js (build Node standard).

## À compléter avant la mise en ligne

Tout est piloté par `lib/site.ts` : **une valeur à `null` n'est simplement pas affichée**
(aucune donnée n'est inventée). Renseigner la constante suffit à activer le bloc correspondant.

### Bloquant

- [ ] **Photos** : déposer les fichiers dans `public/photos/` (cadrage 4:5, min. 800×1000)
      puis renseigner `photos.heroPortrait`, `photos.aboutPortrait`, `photos.aboutSecondary`.
      Tant que c'est `null`, le composant `Photo` affiche le cadre de marque.
- [ ] **Durée Calendly** : le site annonce un entretien d'**1 heure** ; l'événement Calendly
      est encore configuré sur 30 min (slug `…-30min`). Passer la durée à 60 min dans Calendly,
      puis reporter la nouvelle URL dans `siteConfig.calendlyUrl`.
- [ ] **Témoignages** : les 5 avis affichés sont tronqués (texte fourni avec « … »).
      Récupérer les textes complets dans `messages/fr.json → home.temoignages.items`.
- [ ] **Mentions légales** : renseigner `credentials.siret`, `legalForm`, `postalAddress`
      (obligatoires, art. 6 LCEN). Un encart « en cours de collecte » s'affiche en attendant.

### Recommandé

- [ ] **Qualiopi / NDA** : `credentials.qualiopi`, `credentials.nda` (affiche le bandeau
      de confiance + `hasCredential` en JSON-LD).
- [ ] **Chiffres clés** : `keyFigures.peopleSupported`, `since`, `rating`.
      ⚠️ Chiffres vérifiables uniquement.
- [ ] **Facebook** : `siteConfig.social.facebook` (le lien n'apparaît pas tant qu'il vaut `null`).
- [ ] **`NEXT_PUBLIC_SITE_URL`** : domaine de production réel. **Le build échoue
      volontairement sans cette variable** en production (sinon canonicals/OG/sitemap
      pointeraient vers `localhost`).

---

Design : handoff Mévolution (desktop + mobile). Développement : La Française du Logiciel.

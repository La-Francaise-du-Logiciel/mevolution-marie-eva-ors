# Mévolution — Consulting & Coaching

Site vitrine de **Mévolution — Consulting & Coaching**, l'activité de **Maréva Ors**, conseillère en évolution professionnelle (coaching emploi + bilan de compétences).

Le site présente l'offre, la personne, et convertit vers un **entretien découverte gratuit de 30 min** (Calendly) ou un formulaire de contact.

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
- [À remplacer avant la mise en ligne](#à-remplacer-avant-la-mise-en-ligne)

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
├── layout.tsx                # <html lang="fr">, polices, providers, header/footer, JSON-LD
├── page.tsx                  # Accueil (inclut la section « À propos »)
├── coaching/page.tsx
├── bilan-de-competences/page.tsx
├── contact/page.tsx
├── not-found.tsx
├── opengraph-image.tsx       # Image OG (1200×630)
├── api/contact/route.ts      # Endpoint formulaire (Resend + rate limiting)
├── globals.css               # Tokens Tailwind v4 + base + animations
├── manifest.ts / robots.ts / sitemap.ts
└── providers.tsx             # PostHog + suivi des pages vues
components/
├── ui/                       # Primitives (button, input, form, checkbox…)
├── brand/                    # Leaf, Eyebrow, Reveal, CtaBand, Container…
├── layout/                   # Header, Footer, MobileNav
└── sections/                 # Sections par page (home/, coaching/, bilan/, contact/)
i18n/                         # request.ts (config next-intl, français)
lib/                          # utils, site, seo, json-ld, schemas, analytics, rate-limit, fonts
messages/                     # fr.json (toute la copie)
public/                       # logo, favicon, assets de marque
```

### Pages & navigation

| Route                   | Contenu                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/`                     | Hero, **À propos** (portrait, parcours, valeurs), Pour qui ?, Les accompagnements, La méthode, Témoignages, CTA, FAQ   |
| `/coaching`             | Coaching emploi : promesses, déroulement en 4 phases, modalités, histoire personnelle de Maréva Ors                    |
| `/bilan-de-competences` | Bilan de compétences : pourquoi / à qui, citation, cadre pratique (durée, formules, financement, méthode Orientaction) |
| `/contact`              | Formulaire + coordonnées                                                                                               |

Le contenu de `/coaching` et `/bilan-de-competences` est repris du site officiel existant (Google Sites), adapté au ton et à la mise en page du design.

## Langue

Site **100 % français**, sans routing de langue : les pages vivent sur `/`, `/coaching`, `/bilan-de-competences`, `/contact` (aucun préfixe `/fr`).

- Toute la copie vit dans `messages/fr.json`, gérée via next-intl en mode « sans i18n routing » (pratique pour centraliser et éditer les textes).
- Pour rajouter une langue plus tard : réintroduire le routing i18n de next-intl (segment `[locale]` + middleware) et un fichier `messages/en.json`.

## SEO

- `generateMetadata` par page : title, description, canonical, OG, Twitter cards.
- **JSON-LD** : `ProfessionalService`, `WebSite`, `Person` (à propos), `FAQPage` (accueil), `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon SVG.
- Image Open Graph générée dynamiquement (`opengraph-image.tsx`).
- Rendu statique (SSG) : toutes les pages sont pré-générées en HTML.

## Intégrations

### Resend (email)

1. Créer un compte [Resend](https://resend.com) et **vérifier un domaine** d'envoi.
2. Renseigner `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
3. L'endpoint `POST /api/contact` valide (Zod), applique un **rate limiting** (5 requêtes / 10 min / IP), un **honeypot** anti-spam, puis envoie l'email (`replyTo` = email du visiteur).

### PostHog (analytics)

- Renseigner `NEXT_PUBLIC_POSTHOG_KEY` (+ `NEXT_PUBLIC_POSTHOG_HOST`).
- Pages vues suivies à chaque navigation ; événements personnalisés : `cta_calendly_click`, `contact_form_submitted`, `contact_form_error`.

## Déploiement

Optimisé pour **Vercel** :

1. Importer le repo dans Vercel.
2. Renseigner les variables d'environnement (voir tableau).
3. Déployer (`npm run build` est détecté automatiquement).

Fonctionne sur toute plateforme supportant Next.js (build Node standard).

## À remplacer avant la mise en ligne

Le design est haute-fidélité mais certains contenus sont des **placeholders** (cf. handoff design) :

- [ ] **Photos** : portrait de Maréva + séances (cadrage 4:5) → remplacer les `PhotoPlaceholder`.
- [ ] **Témoignages** : textes réels à recueillir (section « Témoignages » de l'accueil).
- [ ] **Pages légales** : Mentions légales & Politique de confidentialité (liens `#` dans le footer).
- [ ] **Liens réseaux** : confirmer LinkedIn / Instagram (`orsmareva`) ; ajouter Facebook (`#`).
- [ ] **Images OG 1200×630** définitives (sinon l'image générée par défaut est utilisée).
- [ ] **`NEXT_PUBLIC_SITE_URL`** : domaine de production réel.

---

Design : handoff Mévolution (desktop + mobile). Développement : La Française du Logiciel.

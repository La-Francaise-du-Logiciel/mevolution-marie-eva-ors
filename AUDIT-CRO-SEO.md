# Audit CRO / UX / Copywriting / SEO — Mévolution (Maréva Ors)

**Date :** 28 juillet 2026
**Périmètre analysé :** `/`, `/coaching`, `/bilan-de-competences`, `/contact` — contenu (`messages/fr.json`), structure des sections, métadonnées, JSON-LD, parcours CTA, formulaire.
**Base de l'analyse :** code source du site (contenu réel + structure de rendu).

> **Ce que cet audit ne couvre pas** (données non disponibles dans le repo) : analytics réelles (taux de conversion actuel, taux de rebond, sources de trafic), Core Web Vitals mesurés en production, positions SERP réelles, profil de backlinks, analyse concurrentielle terrain. Les estimations d'impact sont des **fourchettes indicatives** issues de benchmarks du secteur services / coaching B2C, pas des projections mesurées. À valider par A/B test ou comparaison avant/après sur PostHog.

---

## 1. Résumé exécutif

### Le constat en une phrase

Le site est **techniquement excellent et graphiquement abouti**, mais il **n'est pas prêt à convertir** : il est publié avec des placeholders visibles (photos et témoignages), sans aucune preuve sociale, sans prix, sans mention de certification, sans pages légales, et sans ancrage local — alors que l'activité est locale et que l'atout n°1 de Maréva Ors (son histoire personnelle de burn-out et de reconversion) est enterré en bas d'une page secondaire.

### Diagnostic par axe

| Axe                            | Note     | Commentaire                                                                                                                                                    |
| ------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Qualité technique / perf       | 9/10     | Next.js SSG, métadonnées propres, JSON-LD, a11y de base (skip-link, aria), formulaire validé + anti-spam + rate limit. Très solide.                            |
| Design & identité visuelle     | 8/10     | Cohérent, chaleureux, différenciant dans un secteur très générique.                                                                                            |
| **Confiance / preuve sociale** | **1/10** | **Zéro témoignage réel (placeholders affichés), zéro chiffre, zéro logo, zéro certification, pages légales mortes.**                                           |
| **Contenu & copywriting**      | **4/10** | Ton juste et humain, mais vague, sans bénéfices chiffrés, sans traitement des objections (prix, durée, résultats).                                             |
| Mission / positionnement       | 5/10     | La mission existe et est belle, mais elle est diffuse et sa preuve (l'histoire de Maréva) est mal placée.                                                      |
| **CTA & parcours**             | **4/10** | CTA unique et répétitif, absent du header en mobile, sortie systématique du site vers Calendly, aucune offre intermédiaire pour les 95 % non prêts à réserver. |
| Structure / UX                 | 6/10     | Hiérarchie correcte mais ordre des sections sous-optimal, dead-ends entre pages.                                                                               |
| **SEO**                        | **3/10** | Fondations techniques bonnes, mais contenu thin, H1 sans mots-clés, **aucun ciblage local**, pas de contenu éditorial, E-E-A-T quasi nul.                      |

### Les 3 verdicts qui comptent

1. **Le site ne peut pas être laissé en ligne en l'état.** Deux blocs « Témoignage client à venir — à recueillir auprès d'un·e vrai·e client·e » et des cadres « PHOTO ↗ portrait de Maréva Ors » sont **rendus tels quels aux visiteurs**. C'est un signal « site pas fini / pas sérieux » qui détruit la confiance au moment exact où on essaie de la construire, et sur un métier où la confiance **est** le produit.
2. **Le site vend un service de confiance sans aucune preuve.** Aucun témoignage, aucun chiffre (personnes accompagnées, taux de retour à l'emploi, années d'expérience), aucune certification affichée (Qualiopi n'apparaît nulle part alors qu'elle conditionne le financement CPF du bilan), aucun prix, aucun avis Google. Le visiteur doit tout croire sur parole.
3. **Le site laisse 100 % de son potentiel SEO local sur la table.** L'activité couvre explicitement Saverne – Haguenau – Strasbourg (information mentionnée **une seule fois**, enterrée dans un paragraphe de `/coaching`). Aucun titre, aucun H1, aucune description, aucun schema n'exploite cette zone. « bilan de compétences Strasbourg » est le type de requête à forte intention commerciale que ce site devrait capter — il est aujourd'hui invisible dessus.

### Potentiel

Un site vitrine de coaching bien optimisé convertit typiquement **2 à 5 %** des visiteurs en prise de rendez-vous. En l'état, ce site est probablement **sous 1 %** (placeholders + zéro preuve + CTA mobile dégradé). Les correctifs P0 seuls (nettoyage des placeholders, preuve sociale, CTA mobile, prix, pages légales) devraient permettre d'atteindre une base saine ; l'ensemble du plan vise le haut de fourchette, avec en parallèle un potentiel de trafic organique local qualifié aujourd'hui nul.

---

## 2. Principaux freins à la conversion

Classés par gravité. Chaque frein est détaillé dans les sections thématiques.

| #   | Frein                                                                     | Priorité     | Impact estimé sur le taux de conversion  |
| --- | ------------------------------------------------------------------------- | ------------ | ---------------------------------------- |
| F1  | Placeholders visibles (témoignages × 2, photos × 2)                       | **Critique** | +30 à +60 % (correction)                 |
| F2  | Aucune preuve sociale d'aucune sorte                                      | **Critique** | +20 à +40 %                              |
| F3  | Aucun prix, aucun ordre de grandeur tarifaire                             | **Critique** | +15 à +30 %                              |
| F4  | Aucune certification / cadre légal affiché (Qualiopi, CPF, SIRET)         | **Critique** | +10 à +25 %                              |
| F5  | Pages légales mortes (`href="#"`) + consentement RGPD sans lien           | **Critique** | Risque juridique + perte de confiance    |
| F6  | CTA absent du header en mobile, pas de barre CTA collante                 | **Élevé**    | +10 à +20 % sur mobile                   |
| F7  | Conversion unique = Calendly en onglet externe, aucune alternative light  | **Élevé**    | +15 à +25 %                              |
| F8  | Proposition de valeur du H1 vague et interchangeable                      | **Élevé**    | +5 à +15 %                               |
| F9  | Histoire personnelle de Maréva (différenciateur n°1) enterrée             | **Élevé**    | +8 à +15 %                               |
| F10 | Objections non traitées (durée, résultats, employeur, confidentialité)    | **Élevé**    | +10 à +20 %                              |
| F11 | Ordre des sections : « À propos » avant le problème du visiteur           | **Moyen**    | +3 à +8 %                                |
| F12 | Aucun ancrage local visible                                               | **Moyen**    | Fort impact SEO, indirect sur conversion |
| F13 | FAQ à 3 questions seulement                                               | **Moyen**    | +5 à +10 %                               |
| F14 | Formules du bilan (Essentielle / Essentielle+ / Classique) non expliquées | **Moyen**    | +5 à +10 % sur `/bilan-de-competences`   |
| F15 | Dead-ends : pas de maillage entre pages services ni vers `/contact`       | **Moyen**    | +3 à +7 %                                |
| F16 | Lien Facebook mort (`href="#"`)                                           | **Faible**   | Signal de négligence                     |

---

## 3. Analyse du contenu

### 3.1 Clarté de la proposition de valeur — **Priorité : Élevée**

**Problème.** Le H1 de l'accueil est :

> « Atteignez vos objectifs _professionnels_. »

accompagné de :

> « Un accompagnement global et sur-mesure pour construire un projet professionnel qui vous ressemble — et avancer en confiance. »

Ce couple titre + accroche est **entièrement interchangeable**. Il pourrait figurer sur le site de n'importe lequel des ~15 000 coachs et cabinets de bilan de compétences français sans qu'un seul mot ne change. Il ne dit ni **pour qui**, ni **quel problème**, ni **quel résultat**, ni **en combien de temps**, ni **où**. « Global », « sur-mesure », « qui vous ressemble », « en confiance » sont quatre expressions creuses empilées.

**Impact.** Le H1 est l'élément le plus lu de la page (règle empirique : 8 lecteurs sur 10 lisent le titre, 2 sur 10 lisent la suite). Un H1 sans spécificité ne crée aucune reconnaissance de soi (« c'est exactement ma situation »), donc aucune raison de scroller. C'est le premier point de fuite de la page.

**Le paradoxe.** Le site contient déjà une formule excellente — **« De la galère à l'embauche »** — mais elle est reléguée en H1 de `/coaching`, une page que la majorité des visiteurs ne verra jamais. C'est concret, ça nomme la douleur, c'est mémorable, et c'est le langage réel du prospect.

**Recommandation.** Réécrire le hero de l'accueil autour de la douleur + du résultat + de la preuve. Trois options à tester :

**Option A — douleur/résultat (recommandée) :**

```
Eyebrow : Coaching emploi & bilan de compétences · Strasbourg, Saverne, Haguenau
H1      : De la galère à l'embauche, vous n'êtes plus seul·e.
Lead    : Recherche d'emploi qui s'enlise, reconversion qui fait peur, travail qui
          n'a plus de sens ? Je suis Maréva Ors — passée par là — et j'accompagne
          depuis {X} ans celles et ceux qui veulent retrouver un cap professionnel.
          {N} personnes accompagnées.
CTA 1   : Réserver mon entretien gratuit de 30 min
CTA 2   : Voir les accompagnements
Réass.  : ✓ Gratuit et sans engagement · ✓ Réponse sous 24 h · ✓ Visio ou présentiel en Alsace
```

**Option B — question miroir :**

```
H1   : Et si votre travail avait à nouveau du sens ?
Lead : Coaching emploi et bilan de compétences avec Maréva Ors — conseillère en
       évolution professionnelle. Un premier échange de 30 min, gratuit, pour
       savoir par où commencer.
```

**Option C — orientée résultat mesurable** (si les chiffres existent) :

```
H1   : {N} personnes ont retrouvé un cap professionnel avec moi.
Lead : Coaching emploi, bilan de compétences, reconversion. Un accompagnement
       humain, à Strasbourg, Saverne, Haguenau ou à distance.
```

**Impact attendu :** +5 à +15 % sur le taux de conversion global de la page d'accueil, davantage sur le taux de scroll au-delà du hero.

---

### 3.2 Bénéfices vs fonctionnalités — **Priorité : Élevée**

**Problème.** Le site décrit majoritairement **ce qui se passe**, rarement **ce que le client obtient**.

Exemples relevés :

| Formulation actuelle                                                                            | Nature         | Ce qui manque                                           |
| ----------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------- |
| « Des séances individuelles régulières, avec un suivi personnalisé entre les rendez-vous. »     | Fonctionnalité | Combien ? Sur quelle durée ? Pour aboutir à quoi ?      |
| « Un parcours structuré en plusieurs séances, avec des temps de réflexion personnels »          | Fonctionnalité | Combien de séances ? Quel livrable final ?              |
| « Le plan d'action — avancer : Candidatures, réseau, formation : on construit un plan concret » | Process        | Un plan écrit ? Un document remis ?                     |
| « Rendre vos démarches plus efficaces, grâce à des techniques de recherche d'emploi »           | Semi-bénéfice  | Efficaces = combien d'entretiens en plus ?              |
| « Durée : 3 à 6 mois — En moyenne 135 jours »                                                   | Donnée brute   | Ce que ça implique concrètement pour l'agenda du client |

Seul le bloc `coaching.promesses` fait correctement le travail (« Rompre la solitude et l'isolement », « Reprendre confiance en vous ») — et encore, sans preuve derrière.

**Impact.** Le prospect ne peut pas se projeter dans un résultat. Il compare donc sur le seul critère qu'il comprend : le prix (absent) ou le feeling. La décision est reportée.

**Recommandation.** Appliquer la règle **« fonctionnalité → donc → bénéfice → preuve »** sur chaque bloc descriptif. Réécritures concrètes :

> **Avant :** « Des séances individuelles régulières, avec un suivi personnalisé entre les rendez-vous. »
>
> **Après :** « 6 à 10 séances individuelles d'1h, toutes les 1 à 2 semaines — **pour ne jamais rester bloqué·e seul·e devant une candidature.** Entre les rendez-vous, je reste joignable par téléphone et mail. Vous repartez avec un CV, une lettre-type et une stratégie de recherche que vous savez utiliser sans moi. »

> **Avant :** « Le plan d'action — avancer : Candidatures, réseau, formation : on construit un plan concret, étape par étape. »
>
> **Après :** « **Vous repartez avec un plan d'action écrit** : quelles entreprises cibler, quels messages envoyer, quelles formations envisager, et dans quel ordre. Plus de "je ne sais pas par où commencer" le lundi matin. »

> **Avant :** « Bilan : Un entretien final pour faire le point sur votre parcours. Vous repartez avec une synthèse écrite de votre accompagnement. »
>
> **Après :** _(déjà correct — c'est le meilleur bloc du site. Le mettre en avant, pas en 4ᵉ position d'une liste.)_

**Impact attendu :** +5 à +12 %.

---

### 3.3 Objections non traitées — **Priorité : Critique**

C'est le trou le plus large du site. Voici les objections qu'un prospect en recherche d'emploi ou en reconversion se pose systématiquement, et leur traitement actuel :

| Objection                                                | Traitée ?         | Où                                                                                    |
| -------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| **Combien ça coûte ?**                                   | ❌ **Nulle part** | —                                                                                     |
| **Est-ce finançable ? CPF ?**                            | ⚠️ Évasif         | FAQ : « Les modalités de financement sont abordées ensemble lors du premier échange » |
| **Est-ce que ça marche ? Quels résultats ?**             | ❌ Non            | —                                                                                     |
| **Combien de temps ça prend ?**                          | ⚠️ Partiel        | Bilan : « 3 à 6 mois ». Coaching : rien.                                              |
| **Suis-je obligé·e de continuer après le 1er échange ?** | ✅ Oui            | Bien traité (« sans engagement » répété)                                              |
| **Mon employeur va-t-il le savoir ?**                    | ❌ Non            | Objection n°1 du bilan de compétences — absente                                       |
| **Est-ce confidentiel ?**                                | ⚠️ Une ligne      | Formulaire uniquement, pas sur le service                                             |
| **Est-elle qualifiée / certifiée ?**                     | ❌ Non            | Aucune certification affichée                                                         |
| **Coaching ou bilan : lequel pour moi ?**                | ❌ Non            | Deux cartes juxtaposées, aucune aide au choix                                         |
| **Où ça se passe ?**                                     | ⚠️ Enterré        | Un paragraphe dans `/coaching`                                                        |
| **Quel délai avant de commencer ?**                      | ❌ Non            | —                                                                                     |
| **Que se passe-t-il après ma réservation ?**             | ❌ Non            | —                                                                                     |
| **Et si ça ne me convient pas ?**                        | ❌ Non            | Aucune garantie, aucun droit de rétractation mentionné                                |

**Impact.** Chaque objection non traitée est un visiteur qui quitte le site pour aller chercher la réponse ailleurs — c'est-à-dire chez un concurrent qui, lui, l'affiche. L'absence de prix est de loin la plus coûteuse : elle est perçue soit comme « c'est cher et on me le cache », soit comme un manque de professionnalisme.

**Recommandation.**

1. **Afficher les prix**, ou à défaut des fourchettes explicites. Si le positionnement premium interdit un tarif fixe, utiliser la formule : _« Coaching emploi : à partir de X € la séance, ou Y € le parcours complet de N séances. Bilan de compétences : de X à Y € selon la formule, finançable à 100 % par le CPF. »_ Un site de services sans prix perd systématiquement contre un site avec prix, même plus élevés.
2. **Créer une section « Coaching ou bilan ? »** sur l'accueil : un tableau comparatif à 4 lignes (objectif / durée / financement / pour qui) + une phrase de recommandation. Cette section est aussi une excellente cible SEO (« différence coaching et bilan de compétences »).
3. **Ajouter un bloc « Ce qui se passe après votre réservation »** (3 étapes : vous choisissez un créneau → je vous appelle à l'heure dite → on décide ensemble s'il y a une suite, sans pression). Lever l'anxiété du premier contact augmente mécaniquement les prises de rendez-vous.
4. **Traiter frontalement la confidentialité vis-à-vis de l'employeur** sur `/bilan-de-competences` : _« Votre bilan est strictement confidentiel. Votre employeur n'en est informé que si vous le sollicitez pour le financement — et même dans ce cas, il n'a accès ni au contenu ni aux conclusions. »_

**Impact attendu :** +15 à +30 % sur l'ensemble.

---

### 3.4 Qualité du copywriting — **Priorité : Moyenne**

**Ce qui fonctionne bien** (à préserver absolument) :

- Le ton : chaleureux, non-jugeant, humain. Juste pour la cible.
- **« Plus qu'une coach, je suis votre partenaire active. »** — excellente ligne de positionnement, mémorable, différenciante. Elle mérite d'être sur l'accueil, pas seulement sur `/coaching`.
- **« De la galère à l'embauche »** — le meilleur élément de langage du site.
- Le récit personnel de `coaching.histoire` : sincère, structuré, avec des citations-flash (« Sentiment d'échec et perte de confiance en moi. », « J'ai perdu énormément de temps en renonçant à être accompagnée ! »). C'est du très bon copywriting narratif.
- Le bloc **« Main dans la main »** (`coaching.modalites`) — « je peux réaliser vos démarches avec vous, à votre domicile et sur votre matériel, pour rétablir l'égalité des chances » : **c'est le différenciateur le plus fort et le plus concret de toute l'offre**, et il est en 3ᵉ position d'un bloc secondaire d'une page secondaire.

**Ce qui ne fonctionne pas :**

1. **Abstraction chronique.** « Quête de sens », « donner un nouveau sens », « projet qui vous ressemble », « accompagnement global », « approche globale », « vous révéler à vous-même ». Ces formules sont vraies mais ne créent aucune image mentale. La cible est en détresse pratique (pas d'emploi, pas d'énergie, angoisse du lundi) ; le vocabulaire doit être aussi concret que sa réalité.

2. **La citation de Benjamin Franklin** (`/bilan-de-competences`) occupe une section pleine largeur en fond vert foncé, c'est-à-dire la place la plus visible de la page. Une citation d'un homme d'État du XVIIIᵉ siècle n'apporte **aucune autorité** dans ce contexte, ne rassure pas, ne convertit pas, et n'est pas indexable utilement. Cette place devrait accueillir un témoignage client ou les chiffres clés.

3. **Le placeholder de témoignage est rédigé pour l'équipe, pas pour le visiteur** : « Témoignage client à venir — à recueillir auprès d'un·e vrai·e client·e ». Le visiteur lit littéralement que le site n'a pas de vrai client.

4. **Les cartes « Pour qui ? »** énoncent trois douleurs justes mais s'arrêtent là. Elles nomment le problème sans amorcer la solution ni proposer d'action. Une carte qui dit « Vous cherchez un emploi et l'énergie commence à manquer. » devrait enchaîner sur « → Le coaching emploi est fait pour ça » avec un lien.

5. **« En moyenne 135 jours »** (`bilan.pratique`) : incompréhensible pour un non-initié, et en contradiction apparente avec « 3 à 6 mois ». Par ailleurs le cadre légal du bilan (**24 heures maximum d'accompagnement**, réparties sur la période) n'est jamais mentionné, alors que c'est l'information que les prospects cherchent et comparent.

**Recommandation.** Passe de réécriture ciblée sur : hero accueil, cartes « Pour qui ? » (ajout d'un lien de sortie par carte), section citation Franklin (à remplacer), bloc `bilan.pratique` (clarifier durée / heures / formules).

**Impact attendu :** +5 à +10 %.

---

### 3.5 Différenciation concurrentielle — **Priorité : Élevée**

Le marché du bilan de compétences et du coaching emploi est saturé et fortement standardisé (beaucoup d'acteurs sont, comme ici, partenaires de réseaux type Orientaction, avec le même discours).

**Les 3 différenciateurs réels de Mévolution :**

1. **Le vécu de Maréva.** Doctorat, échec de la recherche d'emploi en autonomie, burn-out en 2018, un an d'incapacité, reconversion en 2020 grâce à un accompagnement. C'est de l'**Experience** au sens E-E-A-T de Google, et c'est de la preuve d'empathie au sens CRO. Personne ne peut copier ça.
2. **Le « Main dans la main ».** Faire les démarches numériques _avec_ le client, chez lui, sur son matériel, pour rétablir l'égalité des chances. C'est une offre concrète, inhabituelle, et qui répond à une fracture numérique réelle chez les demandeurs d'emploi.
3. **Le double registre coaching + bilan** avec une seule interlocutrice, en local (Alsace) et à distance.

**Problème.** Ces trois éléments sont respectivement : en bas de `/coaching`, en 3ᵉ colonne d'un encart de `/coaching`, et jamais formulé comme un avantage. **La page d'accueil, qui reçoit l'essentiel du trafic, ne contient aucun des trois.**

**Recommandation.**

- Ajouter sur l'accueil, juste après « Pour qui ? », une section **« Pourquoi moi »** en 3 points reprenant ces différenciateurs, avec un lien « Lire mon histoire » vers `/coaching#mon-histoire`.
- Remonter un extrait fort de l'histoire dans la section « À propos » de l'accueil. Par exemple : _« En 2018, j'ai fait un burn-out. En 2020, j'ai accepté d'être accompagnée — et j'ai compris que j'avais perdu deux ans à vouloir m'en sortir seule. C'est pour ça que je fais ce métier. »_ suivi de « Lire mon parcours complet → ».
- Envisager de faire de « Main dans la main » une **offre nommée et affichée** sur l'accueil, pas une modalité.

**Impact attendu :** +8 à +15 %.

---

## 4. Analyse de la mission et du positionnement

### 4.1 La mission est-elle clairement expliquée ? — **Priorité : Élevée**

**Non, pas explicitement.** Le site n'énonce jamais sa mission sous forme de phrase-mission. Elle doit être **reconstituée** par le visiteur à partir de fragments dispersés :

- `home.about.lead` : « J'accompagne celles et ceux qui cherchent à donner un nouveau sens à leur vie professionnelle. »
- `coaching.histoire.closing` : « Aujourd'hui, je m'épanouis dans ce métier — en vous accompagnant pour surmonter ces galères et trouver, vous aussi, votre épanouissement professionnel. »
- `coaching.modalites` (« Main dans la main ») : « pour rétablir l'égalité des chances. »
- `footer.tagline` : « Coaching emploi et bilan de compétences, avec Maréva Ors. » — purement descriptif, aucune mission.

**Le paradoxe :** la phrase la plus proche d'une vraie mission — _« rétablir l'égalité des chances »_ — est enfouie dans la 3ᵉ colonne d'un encart de modalités pratiques sur une page secondaire. C'est pourtant la seule formulation du site qui exprime une **conviction** plutôt qu'une prestation.

**Impact.** Sans mission clairement énoncée, le site vend une prestation interchangeable au lieu d'un engagement. Or dans le coaching, on n'achète pas une prestation : on achète une personne et ce en quoi elle croit. La mission est le principal levier de préférence à prix égal.

**Recommandation.** Formaliser une mission en une phrase et la déployer à 4 endroits stratégiques. Trois propositions :

> **A.** « Personne ne devrait avoir à traverser seul·e une galère professionnelle. J'ai perdu deux ans à essayer — je fais aujourd'hui ce métier pour que vous n'ayez pas à le faire. »

> **B.** « Rétablir l'égalité des chances face à l'emploi : nous ne sommes pas tous armés de la même façon pour chercher du travail. Mon métier, c'est de combler cet écart — avec vous, pas à votre place. »

> **C.** « Redonner du sens et de la confiance à celles et ceux que le travail a épuisés — parce que je suis passée par là. »

L'option **B** est la plus différenciante (elle est vraie, incarnée dans l'offre « Main dans la main », et personne d'autre ne la revendique). L'option **A** est la plus émotionnelle.

### 4.2 Visibilité de la mission — **Priorité : Élevée**

**Emplacements actuels :** aucun emplacement stratégique.

**Recommandation — déploiement en 4 points :**

| Emplacement                                               | Contenu                                                                                                                                                        |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Accueil, section « À propos »**                         | La phrase-mission en exergue typographique (grand, italique, couleur `mv-grape`), au-dessus du texte « Mon parcours ».                                         |
| **Footer (`footer.tagline`)**                             | Remplacer « Coaching emploi et bilan de compétences, avec Maréva Ors. » par la phrase-mission courte. La tagline actuelle est déjà dite par le logo et la nav. |
| **`/coaching`, ouverture de la section « Mon histoire »** | La mission comme conclusion du récit — c'est là qu'elle est la plus crédible, car démontrée.                                                                   |
| **Meta description + JSON-LD `description`**              | Intégrer la mission pour qu'elle apparaisse en SERP et dans les résultats enrichis.                                                                            |

### 4.3 Connexion émotionnelle — **Priorité : Élevée**

**Le site a tout le matériau émotionnel nécessaire et ne l'utilise pas.**

L'histoire de `coaching.histoire` contient des moments d'une force rare : _« Le vendredi soir, j'angoissais à l'idée de retourner travailler le lundi. »_, _« à force d'entendre "c'est bien beau de faire des études si c'est pour rester au chômage", j'ai commencé à m'isoler »_. Ces phrases sont le cœur battant du site — et elles sont en position ~85 % de scroll d'une page interne.

**Recommandation.**

1. Remonter 2 à 3 phrases de l'histoire sur l'accueil (section « À propos »), avec lien vers le récit complet.
2. **Ajouter une ancre `#mon-histoire`** sur la section `Histoire` de `/coaching` pour pouvoir y lier directement.
3. Réordonner : sur `/coaching`, l'histoire arrive après « Modalités » (informations administratives). Elle devrait arriver **juste après le hero ou juste après les promesses** — c'est ce qui donne envie de lire la suite.
4. Envisager une **vidéo de 60 à 90 secondes** de Maréva se présentant, en haut de l'accueil ou sur `/contact`. Sur un métier de relation humaine, la vidéo est le format le plus rentable pour lever la friction du premier contact (impact typique observé sur pages de service : +15 à +30 % de prises de rendez-vous).

**Impact attendu (4.1 à 4.3 cumulés) :** +8 à +18 %.

---

## 5. Analyse des CTA

### 5.1 Inventaire des CTA existants

| Page                     | CTA                                      | Emplacement                     | Destination                          |
| ------------------------ | ---------------------------------------- | ------------------------------- | ------------------------------------ |
| Toutes (desktop ≥1024px) | « Entretien découverte gratuit »         | Header sticky                   | Calendly (onglet externe)            |
| Toutes (mobile)          | « Entretien découverte gratuit »         | **Menu hamburger uniquement**   | Calendly                             |
| `/`                      | Idem + « Découvrir les accompagnements » | Hero                            | Calendly / ancre `#accompagnements`  |
| `/`                      | « En savoir plus » ×2                    | Cartes accompagnements          | `/coaching`, `/bilan-de-competences` |
| `/`                      | « Entretien découverte gratuit »         | Bandeau CTA (après témoignages) | Calendly                             |
| `/coaching`              | Idem                                     | Hero + bandeau final            | Calendly                             |
| `/bilan-de-competences`  | Idem                                     | Hero + bandeau final            | Calendly                             |
| `/contact`               | Carte Calendly + formulaire + mail + tél | Corps de page                   | Calendly / API / mailto / tel        |
| Footer                   | Aucun CTA                                | —                               | —                                    |

### 5.2 Problèmes identifiés

#### P1 — CTA absent du header en mobile — **Priorité : Critique**

`components/layout/header.tsx:88` : le bouton CTA porte `className="hidden lg:inline-flex"`. En dessous de 1024px, **le header n'affiche aucun CTA** : uniquement le logo et l'icône hamburger. Le seul accès au CTA depuis le header mobile demande d'ouvrir le menu, puis de scroller jusqu'en bas du panneau (le bouton est en `mt-auto`).

**Impact.** Le trafic d'un site de coaching est majoritairement mobile (typiquement 60-75 %). Ce choix retire le CTA persistant à la majorité des visiteurs et ajoute 2 actions à chaque conversion mobile.

**Recommandation.** Deux correctifs cumulables :

- Afficher une version compacte du CTA dans le header mobile (icône calendrier + « Réserver », ou simplement « Réserver » en `size="sm"`).
- **Ajouter une barre CTA collante en bas d'écran en mobile**, apparaissant après ~40 % de scroll : un bouton pleine largeur « Réserver mon entretien gratuit » + un bouton secondaire « Appeler ». C'est le levier mobile au meilleur rapport effort/impact du site.

**Impact attendu :** +10 à +20 % sur mobile.

---

#### P2 — Un CTA unique, sortant, sans alternative légère — **Priorité : Élevée**

Tous les CTA du site (hors `/contact`) pointent vers la **même action, à engagement élevé** : réserver un appel téléphonique de 30 min avec une inconnue, via un service tiers, dans un onglet externe.

Trois problèmes :

1. **Aucune offre intermédiaire.** Un visiteur qui découvre le site n'est pas prêt à téléphoner. En l'état, s'il n'est pas prêt à réserver, il n'a **rien d'autre à faire** que partir. Or c'est le cas de la grande majorité du trafic.
2. **Sortie du site.** `target="_blank"` vers Calendly : on perd le contexte de marque, on ajoute un temps de chargement tiers, et le funnel est coupé — PostHog trace `cta_calendly_click` mais **jamais la réservation effective**. Vous ne savez donc pas si le problème est le CTA ou la page Calendly.
3. **Le formulaire de contact est le parent pauvre.** Il n'est atteignable que via l'onglet « Contact » de la nav. Aucun CTA du site n'y renvoie, alors que c'est une conversion à friction plus faible (asynchrone, pas de téléphone).

**Recommandation.**

- **Embarquer Calendly en inline** sur `/contact` (widget intégré) plutôt que de sortir du site, et ajouter le tracking de l'événement de réservation (Calendly expose des événements postMessage, ou utiliser une page `/merci` en redirection avec un événement PostHog + conversion Google Ads/Analytics).
- **Ajouter un CTA secondaire systématique** sous chaque CTA principal : « Pas encore prêt·e à réserver ? Écrivez-moi → » vers `/contact#formulaire`.
- **Créer un aimant à leads** pour capter les 90 % non prêts : un guide PDF téléchargeable contre email, par exemple _« Les 7 erreurs qui font durer une recherche d'emploi (et comment les éviter) »_ ou _« Bilan de compétences : le guide pour choisir et le faire financer »_. C'est le chaînon manquant du funnel : il transforme du trafic perdu en liste email nurturable, et c'est aussi un excellent contenu SEO.
- **Ajouter un CTA dans le footer** (aujourd'hui purement navigationnel).

**Impact attendu :** +15 à +25 % sur le volume total de leads (rendez-vous + messages + emails captés).

---

#### P3 — Fréquence et répartition des CTA — **Priorité : Moyenne**

Sur l'accueil, entre le hero et le bandeau CTA final, le visiteur traverse **5 sections complètes** (À propos, Pour qui, Accompagnements, Méthode, Témoignages) — soit plusieurs milliers de pixels — **sans une seule opportunité de conversion**, à l'exception de deux liens « En savoir plus ».

**Recommandation.** Insérer un CTA après « Les accompagnements » (moment de plus forte intention : le visiteur vient de comprendre l'offre) et après « Pour qui ? » (moment de reconnaissance de soi). Un CTA discret en ligne suffit : _« Vous vous reconnaissez ? Réservons 30 min pour en parler → »_.

Sur `/coaching`, le seul CTA après le hero est en toute fin de page, après un récit de ~450 mots. Ajouter un CTA après la section « Le déroulement ».

**Impact attendu :** +3 à +8 %.

---

#### P4 — Wording des CTA — **Priorité : Moyenne**

Le libellé unique est **« Entretien découverte gratuit »**. C'est clair et le mot « gratuit » est bien présent, mais :

- Ce n'est pas une **action** : c'est un nom. Les libellés à la première personne et à l'infinitif convertissent mieux.
- Il est **identique partout** (header, hero, 3 bandeaux, menu mobile, carte contact), ce qui rate l'occasion d'adapter le message au contexte.
- Il ne rappelle pas la durée ni l'absence d'engagement au moment du clic (l'information est dans une ligne de réassurance séparée, ou dans l'`aria-label` seulement).

**Recommandation — variations par contexte :**

| Emplacement               | Libellé proposé                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------- |
| Header                    | `Réserver 30 min gratuites`                                                            |
| Hero accueil              | `Réserver mon entretien gratuit` + sous-texte `30 min par téléphone · sans engagement` |
| Après « Accompagnements » | `Savoir lequel est fait pour moi →`                                                    |
| Bandeau accueil           | `Je réserve mon premier échange`                                                       |
| `/coaching`               | `Parler de ma recherche d'emploi`                                                      |
| `/bilan-de-competences`   | `Vérifier si le bilan est fait pour moi`                                               |
| Barre mobile collante     | `Réserver — c'est gratuit`                                                             |
| Formulaire                | `Envoyer mon message` _(déjà bon)_                                                     |

**Impact attendu :** +3 à +8 %.

---

## 6. Analyse UX et structure de page

### 6.1 Ordre des sections de l'accueil — **Priorité : Moyenne**

**Ordre actuel :** Hero → **À propos** → Pour qui ? → Les accompagnements → La méthode → Témoignages → CTA → FAQ

**Problèmes :**

1. **« À propos » en position 2.** Le site parle de lui avant de parler du visiteur. La règle en CRO : le visiteur doit se reconnaître (« c'est mon problème ») avant de s'intéresser à qui vous êtes. Sur un site de coaching la personne compte énormément — mais elle compte **après** la reconnaissance du problème, pas avant.
2. **La section « À propos » est très longue** : portrait + titre + accroche, puis « Mon parcours », puis « Mes valeurs » avec 3 cartes. Elle occupe environ un tiers de la page avant que le visiteur ait vu une seule offre.
3. **Les témoignages sont juste avant le CTA** — c'est le bon placement (preuve → action). Mais ils sont vides, donc le placement optimal sert actuellement à afficher deux boîtes vides juste avant de demander l'engagement. **C'est le pire endroit possible pour un placeholder.**
4. **La FAQ est après le bandeau CTA.** La FAQ sert à lever les dernières objections — elle devrait précéder l'appel à l'action final, pas le suivre. En l'état, le visiteur qui a des doutes voit le CTA, ne clique pas, puis trouve les réponses… sans plus avoir de CTA après (aucun CTA ne suit la FAQ avant le footer).

**Ordre recommandé :**

```
1. Hero (avec bandeau de réassurance/logos juste en dessous)
2. Pour qui ? — reconnaissance du problème
3. Les accompagnements — la solution  [+ CTA en ligne]
4. Pourquoi moi / À propos — version courte, avec extrait de l'histoire
5. La méthode — comment ça se passe concrètement
6. Chiffres clés + Témoignages — la preuve            ← NOUVEAU
7. FAQ — levée des dernières objections               ← REMONTÉ
8. Bandeau CTA final
```

**Impact attendu :** +3 à +8 %.

### 6.2 Absence de réassurance immédiate sous le hero — **Priorité : Élevée**

Rien, entre le hero et la première section de contenu, ne rassure le visiteur. Une seule ligne existe (« Premier entretien téléphonique gratuit de 30 min, sans engagement »).

**Recommandation.** Ajouter une **barre de confiance** juste sous le hero, sur toute la largeur : logos / mentions **Orientaction · Qualiopi · Mon Compte Formation (CPF)** + 3 chiffres clés (« N personnes accompagnées · X ans d'expérience · Y % de satisfaction »). C'est le premier élément de crédibilité que le visiteur rencontre, et il coûte peu à produire.

**Impact attendu :** +8 à +15 %.

### 6.3 Dead-ends et maillage interne — **Priorité : Moyenne**

- `/coaching` et `/bilan-de-competences` **ne se lient jamais l'une à l'autre**. Un visiteur qui arrive sur `/coaching` par le SEO et réalise que c'est un bilan qu'il lui faut n'a aucun chemin (hors nav).
- Aucune des deux pages ne lie vers `/contact`.
- Les 3 cartes « Pour qui ? » ne sont pas cliquables et ne mènent nulle part.
- Les 3 cartes « Mes valeurs » ne mènent nulle part (acceptable).

**Recommandation.** Rendre les cartes « Pour qui ? » cliquables vers la page de service pertinente. Ajouter en bas de `/coaching` et `/bilan-de-competences` un bloc « Vous hésitez entre les deux ? » avec lien croisé + lien vers `/contact`.

**Impact attendu :** +3 à +7 %, et gain SEO (distribution du PageRank interne).

### 6.4 Lisibilité et scannabilité — **Priorité : Faible**

**Points positifs :** longueurs de ligne maîtrisées (`max-w-[520px]`, `max-w-[640px]`, `max-w-[720px]`), interlignes généreux (1.6-1.75), hiérarchie typographique claire, animations `Reveal` non bloquantes.

**Points d'attention :**

- **La section « Mon histoire »** (`/coaching`) est un mur de 8 paragraphes + citations, sans respiration visuelle autre que les citations. Sur mobile, c'est très long. **Recommandation :** la présenter en frise chronologique (2015 / 2016 / 2018 / 2020 / aujourd'hui) avec des repères visuels d'année. Le contenu comporte déjà les dates — il suffit de les exposer.
- **Le placeholder photo en `aspect-[4/5]`** occupe une hauteur considérable en mobile (jusqu'à ~500px) pour n'afficher qu'un texte mono en gris. Sur mobile, le visiteur voit donc : titre, accroche, boutons, puis un grand rectangle rayé. Fort effet « site en construction ».
- **La FAQ en `<details>` natifs** : bon choix (indexable, pas de JS), mais aucune n'est ouverte par défaut. Ouvrir la première améliore la découvrabilité et le rendu visuel de la section.
- **Les H2 du footer** (« Navigation », « Suivez-moi », « Contact ») sont sémantiquement au même niveau que les H2 de contenu, ce qui bruite le plan du document. Utiliser des `<h2 class="sr-only">` distincts ou des `<p>` stylés.

### 6.5 Formulaire de contact — **Priorité : Moyenne**

**Points positifs :** validation Zod, messages d'erreur en français et bienveillants, honeypot, rate limiting, état de succès traité, mention « Envoi sécurisé », `autoComplete` correct, champs obligatoires marqués.

**Points à améliorer :**

1. **Le consentement RGPD ne pointe vers rien.** « J'accepte que mes informations soient utilisées pour être recontacté·e. Elles restent confidentielles. » — sans lien vers une politique de confidentialité (qui n'existe pas). **Non conforme.**
2. **Aucun champ de qualification.** Ajouter un `<select>` optionnel « Votre situation » (En recherche d'emploi / En poste mais en questionnement / En reconversion / Je ne sais pas encore) améliore nettement la qualité et la préparation des leads, à coût de friction quasi nul.
3. **Pas d'indication de délai de réponse** avant l'envoi. Ajouter « Je réponds sous 24 h ouvrées » au-dessus du bouton : réduit l'incertitude au moment de la décision.
4. **Le message de succès ne dit pas ce qui se passe ensuite.** « Je reviens vers vous très vite. À bientôt. » → préciser « sous 24 h ouvrées » et proposer une action alternative (« En attendant, vous pouvez déjà réserver un créneau → »).

---

## 7. Analyse de la confiance et de la preuve sociale

**C'est la section la plus critique de cet audit. Le score est proche de zéro.**

### 7.1 Témoignages — **Priorité : Critique**

**Problème.** `components/sections/home/temoignages.tsx` boucle sur `[0, 1]` et affiche **deux fois la même chaîne de placeholder** dans des cartes à bordure pointillée :

> « Témoignage client à venir — à recueillir auprès d'un·e vrai·e client·e »

Sous un titre de section « Elles & ils témoignent » / « Des parcours qui redémarrent ». Le visiteur lit donc, mot pour mot, que personne n'a témoigné.

**Impact.** C'est l'élément le plus destructeur de confiance du site entier, et il est placé **juste avant le bandeau CTA principal** — au moment précis de la décision. Une section témoignages vide est nettement pire que pas de section témoignages du tout : elle annonce une promesse de preuve et livre un aveu d'absence.

**Recommandation (par ordre de préférence) :**

1. **Recueillir 4 à 6 témoignages réels.** Méthode rapide : contacter les anciens clients, demander 3 réponses (« Quelle était votre situation avant ? » / « Qu'est-ce qui a changé ? » / « À qui le recommanderiez-vous ? »), rédiger, faire valider par écrit. Afficher prénom + initiale, situation (« Sophie L., reconversion réussie vers les RH »), et si possible photo ou lien LinkedIn. Un témoignage avec visage convertit nettement mieux qu'un témoignage anonyme.
2. **En attendant : supprimer la section.** Ne jamais laisser un placeholder en production.
3. **Mettre en place une collecte d'avis Google** (fiche Google Business Profile) — double bénéfice : preuve sociale vérifiable + SEO local.
4. Ajouter le schema **`AggregateRating`** une fois les avis en place, pour afficher les étoiles en SERP (effet notable sur le CTR organique).

**Impact attendu :** +30 à +60 % (correction du placeholder + vrais témoignages).

### 7.2 Photos — **Priorité : Critique**

**Problème.** Deux `PhotoPlaceholder` en production : dans le hero de l'accueil (« PHOTO ↗ portrait de Maréva Ors / séance d'accompagnement ») et dans « À propos » (« PHOTO ↗ portrait de Maréva Ors »). Rendus en rayures diagonales grises avec le texte en police monospace.

**Impact.** Sur un métier où **la personne est le produit**, ne pas montrer le visage du coach supprime le principal mécanisme de confiance. Le hero — la zone la plus vue du site — affiche un rectangle rayé.

**Recommandation.** Séance photo professionnelle : 1 portrait principal (regard caméra, lumière naturelle, tenue conforme au positionnement chaleureux), 2-3 photos de situation d'accompagnement, 1 photo pour le footer/OG. Prévoir les formats 4:5 (utilisés par les composants) et 1200×630 (Open Graph). Remplacer aussi l'image OG générée, qui conditionne l'aspect des partages LinkedIn — canal probablement principal pour cette activité.

**Impact attendu :** +15 à +30 %.

### 7.3 Chiffres clés — **Priorité : Critique**

**Problème.** **Aucun chiffre nulle part** sur le site : ni nombre de personnes accompagnées, ni années d'expérience, ni taux de retour à l'emploi, ni taux de satisfaction, ni nombre de bilans réalisés.

**Recommandation.** Créer une bande de 3-4 chiffres, placée sous le hero de l'accueil et reprise sur les pages services. Exemples de métriques honnêtes et disponibles :

- `{N}` personnes accompagnées depuis 2021
- `{X} %` ont retrouvé un emploi ou défini un projet clair
- `{Y}` bilans de compétences réalisés
- `4,9/5` note moyenne (une fois les avis Google en place)

**Contrainte importante :** ne publier que des chiffres vérifiables et documentés. Un chiffre inventé est un risque juridique (pratique commerciale trompeuse) et se retourne au premier client qui compare.

**Impact attendu :** +10 à +20 %.

### 7.4 Certifications et cadre légal — **Priorité : Critique**

**Problème.** Le site mentionne uniquement « en partenariat avec Orientaction » et « Méthode Orientaction — Méthode reconnue, leader du bilan de compétences ». Sont **totalement absents** :

- **Qualiopi** — certification qui **conditionne le financement CPF** du bilan de compétences. Son absence est à la fois une perte de crédibilité et une perte de conversion directe : le prospect qui veut utiliser son CPF ne trouve pas la confirmation qu'il cherche.
- **Éligibilité CPF explicite** — la FAQ se contente de « les modalités de financement sont abordées ensemble », ce qui est évasif là où le prospect attend un oui/non.
- **Diplômes et formations de Maréva** — le doctorat n'apparaît que dans un récit ; aucune formation au coaching ou au bilan n'est mentionnée.
- **SIRET, numéro de déclaration d'activité (NDA), assurance RC pro** — attendus sur un site de prestation de services.
- **Affiliations professionnelles** (ICF, EMCC, syndicat, réseau France Travail…) si applicables.

**Impact.** Sur un achat à 1 500-3 000 € (ordre de grandeur d'un bilan), l'absence de cadre certifiant est bloquante. C'est aussi un signal **Trustworthiness** faible pour Google (E-E-A-T), particulièrement pénalisant sur un sujet touchant à la situation financière et professionnelle des personnes (proche du périmètre YMYL).

**Recommandation.**

- Bandeau de certifications (logos Qualiopi + Orientaction + Mon Compte Formation) sous le hero et sur `/bilan-de-competences`.
- Réécrire la FAQ financement : _« Oui. Le bilan de compétences est éligible au CPF. Réalisé en partenariat avec Orientaction (organisme certifié Qualiopi), il peut être financé à 100 % par votre Compte Personnel de Formation, par votre OPCO, par votre employeur, ou en fonds propres. Je vous aide à monter le dossier. »_
- Créer une page « Mentions légales » complète (SIRET, statut, assurance, hébergeur, médiateur de la consommation) et une « Politique de confidentialité ».
- Ajouter une ligne « Formations & certifications » dans la section À propos.

**Impact attendu :** +10 à +25 %.

### 7.5 Pages légales mortes — **Priorité : Critique (conformité)**

**Problème.** `components/layout/footer.tsx` : « Mentions légales » et « Politique de confidentialité » pointent tous deux vers `href="#"`. Le lien Facebook aussi (`siteConfig.social.facebook = "#"`).

**Impact.**

- **Conformité :** les mentions légales sont obligatoires (art. 6 LCEN) et la politique de confidentialité est requise par le RGPD dès lors que le formulaire collecte nom, email, téléphone et message avec une case de consentement. En l'état, le consentement recueilli n'est pas éclairé.
- **Confiance :** un visiteur qui clique sur « Mentions légales » et ne va nulle part perd confiance instantanément.
- **SEO :** Google utilise la présence de pages de contact/légales comme signal de Trustworthiness.

**Recommandation.** Créer `/mentions-legales` et `/politique-de-confidentialite` (en `noindex, follow` si souhaité), lier la politique depuis le texte de consentement du formulaire, et soit renseigner soit retirer le lien Facebook.

### 7.6 Éléments de réassurance manquants — **Priorité : Élevée**

Absents du site : garantie de satisfaction ou droit de rétractation, délai de réponse annoncé, engagement de confidentialité vis-à-vis de l'employeur, description explicite de ce qui se passe après la réservation, sécurité/RGPD des données au-delà d'une ligne, avis externes vérifiables (Google, Trustpilot).

**Recommandation.** Créer un bloc « Mes engagements » (4 items, avec icônes) : _Confidentialité absolue · Réponse sous 24 h · Sans engagement au premier échange · Un accompagnement, pas un catalogue_.

---

## 8. Analyse SEO

### 8.1 Ce qui est déjà bien fait

Les fondations techniques sont **au-dessus de la moyenne du marché** :

- Rendu statique (SSG) — pages pré-générées, excellent pour l'indexation.
- `generateMetadata` par page avec title, description, canonical, Open Graph, Twitter Card.
- JSON-LD : `ProfessionalService`, `WebSite`, `Person`, `FAQPage`, `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon SVG, image OG générée.
- `<html lang="fr">`, skip-link, structure sémantique correcte.
- Un seul H1 par page, hiérarchie H2/H3/H4 globalement propre.
- URLs propres et parlantes (`/bilan-de-competences`).

**Le problème n'est pas technique — il est stratégique et éditorial.**

### 8.2 Aucun ciblage local — **Priorité : Critique**

**Problème.** L'information « zone Saverne – Haguenau – Strasbourg » apparaît **une seule fois dans tout le site**, au milieu d'un paragraphe de la sous-section « Présentiel » de `/coaching`. Par ailleurs :

- Aucun title, H1, H2 ou meta description ne contient de nom de ville.
- Le JSON-LD `ProfessionalService` déclare `areaServed: { "@type": "Country", name: "France" }` — beaucoup trop large, et sans `address` ni `geo`.
- Aucune page dédiée à une zone géographique.
- Rien n'indique l'existence d'une fiche Google Business Profile.

**Impact.** Les requêtes à plus forte intention commerciale de ce marché sont locales : _« bilan de compétences Strasbourg »_, _« coach emploi Haguenau »_, _« bilan de compétences CPF Saverne »_, _« reconversion professionnelle Alsace »_. Elles ont un volume modeste mais une intention d'achat très élevée et une concurrence bien plus abordable que les requêtes nationales. Le site est aujourd'hui **structurellement incapable** de se positionner dessus. C'est la plus grosse perte de trafic qualifié de tout l'audit.

**Recommandation.**

1. Intégrer la géographie dans **titles, H1, leads, meta descriptions** des trois pages principales.
2. Enrichir le JSON-LD :
   ```
   areaServed: [
     { "@type": "City", name: "Strasbourg" },
     { "@type": "City", name: "Haguenau" },
     { "@type": "City", name: "Saverne" },
     { "@type": "AdministrativeArea", name: "Bas-Rhin" }
   ]
   ```
   - `address` (`PostalAddress`) + `geo` (`GeoCoordinates`) + `openingHoursSpecification`.
3. **Créer une fiche Google Business Profile** et y collecter les avis. Pour une activité locale de service, c'est souvent la première source de leads organiques — devant le site lui-même.
4. Envisager 2-3 **pages locales** à moyen terme (`/bilan-de-competences-strasbourg`, `/coaching-emploi-haguenau`) — à condition qu'elles aient un contenu réellement spécifique (lieu de RDV, contexte local de l'emploi, témoignages locaux) et non dupliqué.

**Impact attendu :** c'est le principal gisement de trafic organique qualifié du site.

### 8.3 Titles et meta descriptions sous-optimisés — **Priorité : Élevée**

| Page                    | Title actuel                                          | Longueur | Problème                                                                                                  |
| ----------------------- | ----------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `/`                     | `Mévolution — Coaching emploi & bilan de compétences` | ~50      | Marque en premier alors qu'elle n'a aucune notoriété ; aucune ville ; aucun élément d'incitation au clic. |
| `/coaching`             | `Coaching emploi · Mévolution`                        | ~28      | **~30 caractères gaspillés** sur les ~60 disponibles.                                                     |
| `/bilan-de-competences` | `Bilan de compétences · Mévolution`                   | ~33      | Idem ; ne mentionne ni CPF ni ville.                                                                      |
| `/contact`              | `Contact · Mévolution`                                | ~20      | Idem.                                                                                                     |

**Recommandation :**

| Page                    | Title proposé                                                  | Meta description proposée                                                                                                                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                     | `Coaching emploi & bilan de compétences — Strasbourg, Saverne` | `Maréva Ors, conseillère en évolution professionnelle en Alsace. Coaching emploi et bilan de compétences finançable CPF. Premier entretien de 30 min gratuit et sans engagement.`     |
| `/coaching`             | `Coaching emploi individuel à Strasbourg & Haguenau`           | `Recherche d'emploi qui s'enlise ? Coaching individuel avec Maréva Ors : stratégie, candidatures, entretiens, confiance. En présentiel en Alsace ou à distance. 1er échange gratuit.` |
| `/bilan-de-competences` | `Bilan de compétences CPF à Strasbourg & Saverne`              | `Bilan de compétences finançable à 100 % par le CPF, méthode Orientaction. Faites le point et construisez un projet réaliste avec Maréva Ors. Entretien d'information gratuit.`       |
| `/contact`              | `Contact — Réserver un entretien gratuit de 30 min`            | `Réservez votre entretien découverte gratuit avec Maréva Ors, ou écrivez-moi. Coaching emploi et bilan de compétences en Alsace et à distance. Réponse sous 24 h.`                    |

**Impact attendu :** +10 à +25 % de CTR organique à positions égales.

### 8.4 H1 sans mots-clés — **Priorité : Élevée**

| Page                    | H1 actuel                                       | Mots-clés portés                     |
| ----------------------- | ----------------------------------------------- | ------------------------------------ |
| `/`                     | « Atteignez vos objectifs **professionnels**. » | Aucun                                |
| `/coaching`             | « De la galère à **l'embauche**. »              | Aucun (mais excellent en persuasion) |
| `/bilan-de-competences` | « Se connaître, pour mieux **avancer**. »       | Aucun                                |
| `/contact`              | « Parlons de **votre projet**. »                | Aucun                                |

**Aucun H1 du site ne contient sa requête cible.** Les mots-clés n'apparaissent que dans les eyebrows (`<div>`, sans poids sémantique).

**Recommandation.** Deux stratégies possibles :

- **A (recommandée) :** garder des H1 émotionnels mais y intégrer le mot-clé. Ex. `/bilan-de-competences` → « **Le bilan de compétences** pour enfin savoir où vous allez. » ; `/coaching` → « **Coaching emploi** : de la galère à l'embauche. »
- **B :** transformer l'eyebrow en H1 discret et l'accroche en H2 — techniquement valide mais moins lisible.

**Impact attendu :** amélioration significative de la pertinence perçue sur les requêtes cibles.

### 8.5 Contenu insuffisant en profondeur — **Priorité : Élevée**

**Volumétrie estimée :** accueil ~700 mots, `/coaching` ~900 mots, `/bilan-de-competences` ~500 mots, `/contact` ~100 mots. **Total du site : ~2 200 mots.**

Sur ce marché, les pages qui se positionnent en top 3 sur « bilan de compétences + ville » font typiquement 1 500 à 3 000 mots **par page**, avec FAQ étendue, tarifs, déroulé détaillé et témoignages.

**Intentions de recherche non couvertes** (toutes à fort potentiel) :

| Intention          | Requête type                                                     | Couverture                |
| ------------------ | ---------------------------------------------------------------- | ------------------------- |
| Prix               | « prix bilan de compétences », « combien coûte un coach emploi » | ❌                        |
| Financement        | « bilan de compétences CPF », « financer un bilan sans CPF »     | ⚠️ 1 phrase évasive       |
| Comparaison        | « différence coaching et bilan de compétences »                  | ❌                        |
| Déroulement        | « comment se passe un bilan de compétences »                     | ⚠️ Partiel                |
| Éligibilité        | « qui peut faire un bilan de compétences »                       | ⚠️ « À tous ! »           |
| Employeur          | « mon employeur peut-il savoir »                                 | ❌                        |
| Durée              | « durée bilan de compétences 24h »                               | ⚠️ Confus (« 135 jours ») |
| Reconversion       | « se reconvertir à 40 ans », « reconversion après burn-out »     | ❌                        |
| Recherche d'emploi | « lettre de motivation », « préparer un entretien »              | ❌                        |
| Burn-out           | « reprendre le travail après un burn-out »                       | ❌                        |

**Recommandation.**

1. **Étoffer les pages existantes** vers 1 200-1 800 mots avec du contenu réellement utile (déroulé détaillé, tarifs, FAQ spécifique par page, cas concrets).
2. **Créer un espace éditorial** (`/ressources` ou `/blog`) — c'est le seul levier pour capter la longue traîne. 8 à 12 articles fondateurs suffisent à changer d'échelle :
   - « Bilan de compétences : combien ça coûte vraiment en 2026 (et comment le financer) »
   - « Coaching emploi ou bilan de compétences : lequel choisir ? »
   - « Comment se passe un bilan de compétences, séance par séance »
   - « Se reconvertir après un burn-out : par où commencer »
   - « Reconversion à 40 ans : le guide sans langue de bois »
   - « Bilan de compétences et employeur : ce qu'il peut savoir (et ce qu'il ne peut pas) »
   - « Recherche d'emploi qui s'éternise : 7 causes fréquentes »
   - « Financer son bilan de compétences sans CPF : toutes les solutions »
3. **Étendre la FAQ de l'accueil** de 3 à 10-12 questions (voir §8.7), ce qui renforce aussi le schema `FAQPage`.

**Impact attendu :** c'est le levier de croissance du trafic organique à 6-12 mois. Effet quasi nul à court terme, déterminant à moyen terme.

### 8.6 E-E-A-T faible — **Priorité : Élevée**

Le conseil en évolution professionnelle touche à la situation financière et professionnelle des personnes : Google y applique des exigences de qualité renforcées.

| Critère               | État                    | Manque                                                                                                                                                      |
| --------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Experience**        | ⚠️ Fort mais mal exposé | L'histoire de Maréva est le meilleur signal d'expérience vécue du site — enterrée sur une page secondaire, absente de l'accueil, non structurée en JSON-LD. |
| **Expertise**         | ❌ Faible               | Aucune formation, certification ou diplôme listé de façon structurée. Aucun contenu éditorial démontrant l'expertise.                                       |
| **Authoritativeness** | ❌ Très faible          | Aucune mention presse, aucun partenariat visible hors Orientaction, aucun backlink stratégique, pas de contenu citable.                                     |
| **Trustworthiness**   | ❌ Très faible          | Pas de mentions légales, pas de politique de confidentialité, pas de SIRET, pas de prix, pas d'avis, pas de certification.                                  |

**Recommandation.**

- Créer une vraie page `/a-propos` autonome (aujourd'hui c'est une simple ancre `#a-propos` sur l'accueil), avec parcours, diplômes, certifications, méthode, engagements, photo, liens LinkedIn — et un JSON-LD `Person` complet incluant `alumniOf`, `hasCredential`, `knowsAbout`.
- Signer les futurs articles de blog avec un encart auteur.
- Ajouter les schemas `Service` et `Offer` sur les deux pages de service (aujourd'hui absents), et `FAQPage` sur chacune.
- `priceRange: "€€"` est déclaré dans le JSON-LD alors qu'aucun prix n'existe sur le site : incohérence à corriger en affichant les prix.

### 8.7 FAQ trop courte — **Priorité : Moyenne**

3 questions seulement, dont une réponse évasive. Le schema `FAQPage` est bien implémenté mais alimenté par un contenu trop maigre pour espérer un résultat enrichi.

**Recommandation — porter la FAQ à 10-12 questions :**

1. Le premier entretien est-il vraiment gratuit ? _(existante)_
2. Combien coûte un coaching emploi ? **← manquante, la plus recherchée**
3. Combien coûte un bilan de compétences ?
4. Le bilan de compétences est-il finançable par le CPF ? _(à réécrire — réponse ferme)_
5. Quelle est la différence entre le coaching emploi et le bilan de compétences ?
6. Mon employeur sera-t-il informé de ma démarche ?
7. Combien de temps dure un accompagnement ?
8. Comment se déroule concrètement une séance ?
9. En présentiel ou à distance ? _(existante — préciser les villes)_
10. Dans quel délai puis-je commencer ?
11. Et si l'accompagnement ne me convient pas ?
12. Faut-il être demandeur d'emploi pour être accompagné ?

**Impact attendu :** +5 à +10 % en conversion (objections levées) + gain de longue traîne SEO.

### 8.8 Points techniques mineurs — **Priorité : Faible**

- `app/sitemap.ts` : `lastModified: new Date()` place la date du build sur toutes les URLs à chaque déploiement. Utiliser des dates de modification réelles.
- Une seule image OG pour tout le site — créer des images OG par page (fort impact sur le CTR des partages LinkedIn).
- `robots.ts` : la directive `host` est dépréciée (sans conséquence).
- Vérifier que le domaine de production est bien renseigné dans `NEXT_PUBLIC_SITE_URL` (défaut `http://localhost:3000` — si oublié en production, **tous les canonicals, OG et le sitemap pointent vers localhost**, ce qui serait catastrophique). À vérifier en priorité absolue avant tout le reste.
- Aucun suivi de conversion externe (Google Ads / Meta) : à prévoir si de l'acquisition payante est envisagée.

---

## 9. Liste priorisée des améliorations à mettre en œuvre

### P0 — Critique / à corriger avant toute autre chose

| #   | Action                                                                                                                      | Effort                    | Impact estimé          |
| --- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- |
| 1   | **Vérifier `NEXT_PUBLIC_SITE_URL` en production** (risque de canonicals vers localhost)                                     | 5 min                     | Bloquant SEO           |
| 2   | **Supprimer ou remplacer les placeholders de témoignages**                                                                  | 1 h / 1 sem. pour du réel | +30 à +60 %            |
| 3   | **Remplacer les placeholders photo** par de vraies photos                                                                   | 1 séance photo            | +15 à +30 %            |
| 4   | **Créer les pages Mentions légales + Politique de confidentialité** et les lier (dont depuis le consentement du formulaire) | 3 h                       | Conformité + confiance |
| 5   | **Afficher les prix** (ou fourchettes) sur les deux pages de service                                                        | 2 h                       | +15 à +30 %            |
| 6   | **Afficher Qualiopi / CPF / Orientaction** en bandeau de confiance + réécrire la FAQ financement                            | 3 h                       | +10 à +25 %            |
| 7   | **Ajouter un CTA au header mobile + barre CTA collante mobile**                                                             | 3 h                       | +10 à +20 % mobile     |
| 8   | **Corriger ou retirer le lien Facebook mort**                                                                               | 5 min                     | Signal de sérieux      |

### P1 — Élevée / sous 2 à 4 semaines

| #   | Action                                                                           | Effort      | Impact estimé    |
| --- | -------------------------------------------------------------------------------- | ----------- | ---------------- |
| 9   | Réécrire le hero de l'accueil (H1 + accroche + réassurance)                      | 2 h         | +5 à +15 %       |
| 10  | Ajouter une bande « chiffres clés » sous le hero                                 | 2 h         | +10 à +20 %      |
| 11  | Remonter l'histoire de Maréva sur l'accueil + ancre `#mon-histoire`              | 3 h         | +8 à +15 %       |
| 12  | Formaliser et déployer la phrase-mission (4 emplacements)                        | 2 h         | +5 à +10 %       |
| 13  | Étendre la FAQ à 10-12 questions                                                 | 3 h         | +5 à +10 %       |
| 14  | Réécrire les titles + meta descriptions avec ciblage local                       | 1 h         | +10 à +25 % CTR  |
| 15  | Intégrer les mots-clés dans les H1                                               | 1 h         | Pertinence SEO   |
| 16  | Ajouter `address`, `geo`, `areaServed` villes au JSON-LD                         | 1 h         | SEO local        |
| 17  | Créer la fiche Google Business Profile + campagne d'avis                         | 2 h + suivi | SEO local majeur |
| 18  | Ajouter des CTA intermédiaires (après « Accompagnements », après « Pour qui ? ») | 2 h         | +3 à +8 %        |
| 19  | Créer une section « Coaching ou bilan ? » comparative                            | 3 h         | +5 à +10 %       |
| 20  | Réordonner les sections de l'accueil (FAQ avant CTA final)                       | 1 h         | +3 à +8 %        |

### P2 — Moyenne / sous 1 à 3 mois

| #   | Action                                                                | Effort | Impact estimé        |
| --- | --------------------------------------------------------------------- | ------ | -------------------- |
| 21  | Embarquer Calendly en inline + tracker les réservations effectives    | 4 h    | Mesure + friction    |
| 22  | Créer un aimant à leads (guide PDF contre email)                      | 2 j    | +15 à +25 % de leads |
| 23  | Créer une page `/a-propos` autonome (E-E-A-T)                         | 4 h    | Autorité             |
| 24  | Ajouter les schemas `Service` / `Offer` / `FAQPage` par page          | 2 h    | Résultats enrichis   |
| 25  | Réécrire les blocs fonctionnalité → bénéfice                          | 4 h    | +5 à +12 %           |
| 26  | Clarifier le bloc « pratique » du bilan (24 h, formules, durée)       | 2 h    | +5 à +10 %           |
| 27  | Maillage interne : liens croisés services + vers `/contact`           | 2 h    | +3 à +7 %            |
| 28  | Ajouter un champ « votre situation » au formulaire + délai de réponse | 2 h    | Qualité des leads    |
| 29  | Frise chronologique pour « Mon histoire »                             | 3 h    | Lisibilité           |
| 30  | Remplacer la citation Franklin par un témoignage ou des chiffres      | 1 h    | +3 à +6 %            |
| 31  | Bloc « Mes engagements » (confidentialité, délai, sans engagement)    | 2 h    | +5 à +10 %           |
| 32  | Images OG par page                                                    | 3 h    | CTR social           |

### P3 — Faible / continu

| #   | Action                                                                            | Effort   | Impact                      |
| --- | --------------------------------------------------------------------------------- | -------- | --------------------------- |
| 33  | Lancer le blog / espace ressources (8-12 articles fondateurs)                     | 2-3 mois | Trafic organique long terme |
| 34  | Vidéo de présentation de 60-90 s                                                  | 1 j      | +15 à +30 % (à tester)      |
| 35  | Pages locales par ville (si contenu réellement spécifique)                        | 1 sem.   | SEO local                   |
| 36  | Études de cas détaillées (2-3, anonymisées)                                       | 1 sem.   | Preuve + SEO                |
| 37  | Corriger les H2 du footer, ouvrir la 1ʳᵉ FAQ par défaut, dates réelles du sitemap | 1 h      | Hygiène                     |

---

## 10. Top 10 des actions à plus fort impact

Classées par **impact ÷ effort**. Ce sont les 10 actions à mener en premier.

| Rang   | Action                                                                                        | Pourquoi c'est le plus rentable                                                                                                                                                            | Effort   | Impact estimé                             |
| ------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------------------------------------- |
| **1**  | **Recueillir et publier 4-6 témoignages réels** (et supprimer immédiatement les placeholders) | Le placeholder actuel est affiché juste avant le CTA principal : il détruit la confiance au moment exact de la décision. C'est la plus grosse perte du site, et la plus facile à corriger. | 1 sem.   | **+30 à +60 %**                           |
| **2**  | **Remplacer les placeholders photo par de vraies photos de Maréva**                           | Le hero — zone la plus vue — affiche un rectangle rayé. Sur un métier où la personne est le produit, montrer le visage est le premier mécanisme de confiance.                              | 1 séance | **+15 à +30 %**                           |
| **3**  | **Afficher les prix (ou des fourchettes claires)**                                            | L'objection n°1, totalement ignorée. Un site de services sans prix perd contre un site avec prix, même supérieurs.                                                                         | 2 h      | **+15 à +30 %**                           |
| **4**  | **Afficher Qualiopi + CPF + Orientaction, et répondre fermement sur le financement**          | Sur un achat à ~2 000 €, l'absence de cadre certifiant est bloquante — et Qualiopi conditionne le financement CPF que le prospect vient précisément chercher.                              | 3 h      | **+10 à +25 %**                           |
| **5**  | **CTA au header mobile + barre CTA collante en bas d'écran**                                  | La majorité du trafic est mobile et n'a aucun CTA persistant. Meilleur rapport effort/impact purement technique du site.                                                                   | 3 h      | **+10 à +20 % mobile**                    |
| **6**  | **Bande de chiffres clés sous le hero**                                                       | Première preuve rencontrée par le visiteur, avant même de scroller. Coût de production quasi nul si les chiffres existent.                                                                 | 2 h      | **+10 à +20 %**                           |
| **7**  | **Réécrire le hero de l'accueil** (H1 + accroche + ancrage local + réassurance)               | Le H1 actuel est interchangeable. C'est l'élément le plus lu de la page et il ne dit ni pour qui, ni quel problème, ni quel résultat.                                                      | 2 h      | **+5 à +15 %**                            |
| **8**  | **Remonter l'histoire de Maréva sur l'accueil**                                               | Le différenciateur n°1 (burn-out, reconversion, vécu) est enterré à 85 % de scroll d'une page secondaire. Il est déjà écrit — il suffit de le déplacer.                                    | 3 h      | **+8 à +15 %**                            |
| **9**  | **Ciblage local : titles, H1, meta, JSON-LD + fiche Google Business Profile**                 | Les requêtes locales sont les plus qualifiées et les moins concurrentielles de ce marché. Le site en est aujourd'hui structurellement absent.                                              | 4 h      | **Principal gisement de trafic qualifié** |
| **10** | **Créer les pages légales + étendre la FAQ à 10-12 questions**                                | Conformité obligatoire, signal de confiance pour Google et les visiteurs, et levée simultanée de 8 objections bloquantes.                                                                  | 6 h      | **+5 à +10 % + conformité**               |

---

## Séquencement recommandé

**Semaine 1 — Déblocage (à faire même si rien d'autre n'est fait)**
Vérifier `NEXT_PUBLIC_SITE_URL` → supprimer les placeholders → créer les pages légales → corriger le lien Facebook → ajouter le CTA mobile + barre collante.

**Semaines 2-4 — Confiance**
Séance photo → collecte des témoignages → chiffres clés → bandeau certifications → prix → réécriture du hero.

**Mois 2 — Persuasion & SEO on-page**
Mission → histoire remontée → FAQ étendue → titles/H1/meta locaux → JSON-LD enrichi → Google Business Profile → CTA intermédiaires.

**Mois 3+ — Croissance**
Aimant à leads → page /a-propos → blog → études de cas → vidéo → pages locales.

---

_Toutes les estimations d'impact sont des fourchettes indicatives fondées sur des benchmarks sectoriels, à valider par mesure avant/après sur PostHog (les événements `cta_calendly_click` et `contact_form_submitted` sont déjà instrumentés — il manque le suivi de la réservation Calendly effective, cf. §5.2 et action 21)._

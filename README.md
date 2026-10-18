# csb

## Backend

### Prérequis
- Node.js 24 LTS, pnpm 12.14.0
- Comptes / accès nécessaires : Resend (domaine `clicksansbug.ch` vérifié), Vercel Pro

### Installation et lancement en local
```bash
pnpm install
cp .env.example .env.local   # puis renseigner les valeurs (voir « Variables d'environnement »)
pnpm dev
```

En local, mettre `CONTACT_DRY_RUN=true` : le formulaire est entièrement validé, mais les deux emails sont écrits dans le terminal au lieu d'être envoyés (`RESEND_API_KEY` n'est alors pas exigée).

### Variables d'environnement
La liste complète, commentée, est dans `.env.example`. Elles sont validées au démarrage : `next build` échoue en listant toutes les variables manquantes ou invalides. Dev et prod utilisent des valeurs distinctes : en production et sur les aperçus, elles se définissent dans Vercel (Project Settings › Environment Variables), séparément pour « Production » et « Preview » (`CONTACT_DRY_RUN=false` dans les deux ; sur Preview, `CONTACT_TO_EMAIL` peut pointer vers une adresse de test).

### Base de données
Aucune base de données : les demandes du formulaire ne sont pas stockées, elles arrivent par email dans la boîte de réception.

### Tests
- Tests automatisés (Vitest) : `pnpm exec vitest run` (`pnpm test` lance le mode surveillance)
- Test manuel des actions serveur : `pnpm test:actions` — lit `.env.local` ; exige `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` et `NEXT_PUBLIC_SITE_URL` ; force `CONTACT_DRY_RUN=true`, donc n'envoie jamais d'email

### Déploiement
Vercel Pro, fonctions en région `fra1` (`vercel.json`). Étapes :
1. Définir les variables d'environnement de `.env.example` dans Vercel (Production et Preview).
2. Dans Resend : ajouter le domaine `clicksansbug.ch` en région **eu-west-1** (Irlande), poser ses enregistrements SPF, DKIM et DMARC, puis **désactiver le suivi des ouvertures et des clics** du domaine (engagement « aucun traceur » des mentions légales).
3. Aucune migration, aucun webhook, aucune tâche planifiée.

### Services externes
| Service | Usage | Variables d'environnement | Compte détenu par |
|---|---|---|---|
| Resend | Envoi de la notification « Nouveau projet » et de l'accusé de réception | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | ClickSansBug |
| Vercel | Hébergement, logs serveur | `VERCEL_ENV` (fourni automatiquement) | ClickSansBug |

### Données personnelles (nLPD / RGPD)
Le site ne stocke aucune donnée personnelle : les données du formulaire sont transmises par email (via Resend) à la boîte de réception, puis à l'internaute pour l'accusé de réception (sans copie de sa demande). Les journaux serveur ne contiennent jamais le contenu du formulaire ni d'adresse email (hors mode simulé, réservé au local et aux tests). Suppression des données d'une personne : effacer ses emails dans la boîte de réception ; Resend conserve les emails acheminés pendant une durée limitée fixée par ce prestataire.

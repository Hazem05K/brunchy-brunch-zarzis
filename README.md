# Brunchy Brunch Zarzis

Site officiel V1 pour présenter Brunchy Brunch et recevoir des demandes de commande/livraison. Le projet utilise Nuxt 3, Vue 3, TypeScript, Tailwind CSS, une route Nitro côté serveur et SMTP. Il n’inclut ni panier, ni paiement, ni base de données.

## Identité visuelle

La palette utilise le bleu clair `#AFE0FE`, le navy `#022252`, le crème `#FFF5E6`, l’orange chaud `#F4A261` et le jaune doux `#E9C46A`. Les fonds crème, les surfaces blanches, le navy pour le contraste et les accents chauds structurent le design gourmand.

## Prérequis et installation

- Node.js 20 ou plus récent
- npm 10 (fourni avec les versions récentes de Node.js)

```sh
npm install
npm run dev
```

Copiez `.env.example` vers `.env` avec votre explorateur ou la commande `Copy-Item .env.example .env` dans PowerShell, puis renseignez les variables nécessaires.

Le serveur local est disponible sur `http://localhost:3000`.

## Langues

Le site est disponible en français et en arabe. Les pages françaises conservent leurs URL et les pages arabes sont accessibles sous `/ar/` (par exemple `/ar/contact` et `/ar/branches/classic`). Le sélecteur de langue ouvre l’URL correspondante dans l’autre langue. Chaque version définit sa langue et son sens d’écriture dans le document; les textes traduits sont centralisés dans `utils/translations.ts`.

## Build statique et prévisualisation

```powershell
$env:NUXT_APP_BASE_URL = "/"
$env:NUXT_PUBLIC_SITE_URL = "https://example.invalid"
$env:NUXT_PUBLIC_STATIC_SITE = "true"
npm run generate
```

`npm run generate` écrit le site pré-rendu dans `.output/public`. Pour le prévisualiser localement, utilisez un serveur de fichiers statiques :

```powershell
python -m http.server 8000 --directory .output/public
```

Ouvrez `http://localhost:8000`. GitHub Actions définit automatiquement la base URL du dépôt lors du déploiement. Pour un domaine personnalisé, configurez `NUXT_APP_BASE_URL=/` et `NUXT_PUBLIC_SITE_URL` avec l’URL de ce domaine.

GitHub Pages peut héberger ces fichiers sans serveur Node.js. Les routes Nitro `/api/order` et `/api/contact` ne sont pas incluses dans un déploiement statique : les formulaires d’envoi sont donc désactivés sur GitHub Pages, avec un message explicatif. Le code des routes reste disponible pour un hébergement Nuxt/Nitro avec serveur.

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` lance `npm ci` et `npm run generate` à chaque push sur `main`, puis publie `.output/public` au moyen des actions officielles GitHub Pages. Il calcule par défaut la base URL nécessaire à un dépôt de projet, par exemple `/brunchy-brunch-zarzis/`.

Dans le dépôt GitHub, ouvrez **Settings > Pages > Build and deployment**, sélectionnez **GitHub Actions** comme source. Vérifiez aussi que les Actions sont autorisées dans **Settings > Actions > General**. Le dépôt peut rester privé; la disponibilité de Pages pour un dépôt privé dépend du plan GitHub de l’organisation ou du compte. Le site publié peut être public sans rendre le code source public.

Pour un domaine personnalisé, configurez-le dans **Settings > Pages > Custom domain**, puis ajoutez les variables de dépôt **Settings > Secrets and variables > Actions > Variables** :

| Variable | Valeur |
| --- | --- |
| `PAGES_BASE_URL` | `/` |
| `PAGES_SITE_URL` | `https://votre-domaine.example` |

Sans ces variables, le workflow utilise automatiquement l’URL GitHub Pages du dépôt. Pour GitHub Pages de dépôt, ne configurez pas `PAGES_BASE_URL` manuellement.

## Configuration

Copiez `.env.example` vers `.env` localement. Ne publiez jamais ce fichier ni ses valeurs.

| Variable | Usage |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | URL canonique HTTPS du domaine confirmé, sans `/` final. À fournir au build pour les pages pré-rendues et la sitemap. |
| `NUXT_PUBLIC_CONTACT_PHONE` | Numéro public de contact (facultatif; n’ajouter qu’un numéro confirmé). |
| `NUXT_PUBLIC_CONTACT_EMAIL` | E-mail public de contact (facultatif; distinct du destinataire privé des formulaires). |
| `NUXT_PUBLIC_RECAPTCHA_SITE_KEY` | Clé publique Google reCAPTCHA v2 (case à cocher). |
| `NUXT_RECAPTCHA_SECRET_KEY` | Clé secrète reCAPTCHA, serveur uniquement. |
| `SMTP_HOST` | Hôte du service SMTP. |
| `SMTP_PORT` | Port SMTP (587 par défaut; 465 utilise TLS direct). |
| `SMTP_USER` | Utilisateur SMTP. |
| `SMTP_PASSWORD` | Mot de passe SMTP, serveur uniquement. |
| `MAIL_FROM` | Adresse expéditrice autorisée par le serveur SMTP. |
| `MAIL_TO` | Adresse destinataire des demandes. |

Créez les clés reCAPTCHA pour les domaines de production et de test nécessaires dans la console Google reCAPTCHA. Le formulaire reste désactivé sans clé publique, et l’API refuse l’envoi si la clé privée ou la configuration SMTP manque. Aucune clé secrète n’est injectée dans le client.

Chaque branche (Classic, VIP, Royal et Family) a sa propre page et son propre formulaire. L’identifiant de branche est transmis dans un champ masqué; le client ne choisit pas une autre branche dans le formulaire. Le serveur retrouve le nom de la branche dans les données centralisées et l’inclut dans l’e-mail. Les demandes comprennent aussi le nombre de box, validé côté serveur (1 à 30).

La page Contact a son propre formulaire, qui envoie les messages à `MAIL_TO` par SMTP. Le téléphone est requis, l’e-mail facultatif; `replyTo` permet de répondre directement au visiteur. Le numéro et l’e-mail affichés dans les cartes sont des variables publiques facultatives, distinctes des coordonnées privées de réception.

Les formulaires de contact et de livraison partagent un honeypot, une limitation de débit mémoire (5 requêtes par IP sur 15 minutes) et une vérification serveur reCAPTCHA. La limitation mémoire est locale à chaque processus Node et doit être complétée par les limites de l’hébergeur si plusieurs instances sont déployées. Les fiches de branche affichent des cartes de menu maquettes étiquetées comme exemples à valider jusqu’à réception des vrais noms, contenus et tarifs.

## Contenu et images

Les noms Classic, VIP, Royal et Family sont des noms temporaires choisis pour la maquette à la demande du client; les adresses, téléphones, horaires, coordonnées et informations réelles des branches restent à confirmer. Les idées de menu affichées en liste texte (par exemple omelette, 2 pancakes ou yaourt gourmand) sont des exemples à valider et ne sont pas présentées comme le menu réel. Les produits réels sont initialement vides dans [data/products.ts](./data/products.ts).

Pour ajouter/modifier une branche, mettez à jour son `id`, son `name`, son `slug` et uniquement les propriétés validées dans `data/branches.ts`. Gardez les identifiants stables car les formulaires les soumettent au serveur. Les routes de détail, les cartes et la sitemap lisent cette même source de données.

Pour ajouter un produit, renseignez les champs du type `Product` dans `data/products.ts`, avec un `branchId` existant et uniquement un prix/disponibilité confirmés.

Placez les photos autorisées fournies par Brunchy Brunch dans `public/images/`, utilisez des noms descriptifs et renseignez leurs chemins dans les données. Ajoutez toujours un texte alternatif descriptif aux images de contenu. Les photos génériques des cartes et des pages de branches sont uniquement illustratives : elles ne montrent ni les vrais locaux ni le menu réel de ces branches.

Les photos temporaires du hero, des cartes et des galeries (`public/images/*illustrative.jpg`, `public/images/branch-food-*.jpg`, `public/images/*gallery*.jpg`) proviennent d’Unsplash et sont utilisées sous la [licence Unsplash](https://unsplash.com/license). Chaque page de branche conserve sa photo principale et dispose de trois photos supplémentaires dans une galerie horizontale accessible au toucher, avec flèches et indicateurs. Elles sont étiquetées comme illustratives dans le site et leurs textes alternatifs précisent qu’elles ne représentent pas les locaux ou le menu réel. Remplacez-les par des photos autorisées de Brunchy Brunch dès qu’elles seront disponibles. Les polices DM Serif Display et Manrope sont auto-hébergées depuis les paquets Fontsource afin d’éviter les requêtes de polices vers un fournisseur externe.

## SEO

Les pages définissent des titres, descriptions et métadonnées Open Graph/Twitter. Chaque page française et arabe définit son URL canonique et des liens `hreflang` (`fr-TN`, `ar-TN` et `x-default`). Le sitemap inclut les deux langues. Ces URL complètes dépendent de `NUXT_PUBLIC_SITE_URL`, renseignée automatiquement par le workflow Pages; mettez-la à jour pour un domaine personnalisé. La page d’accueil utilise un Schema.org `Restaurant` sans adresse, téléphone, horaires, prix, note ou coordonnées inventés.

## Déploiement Oxahost

L’offre Oxahost n’étant pas spécifiée, vérifiez auprès de l’hébergeur qu’elle supporte :

- Node.js 20+ et un processus Nuxt/Nitro persistant;
- le build Nuxt 3 et les routes serveur `/api/order`;
- les variables d’environnement privées;
- les connexions sortantes SMTP et HTTPS vers l’API reCAPTCHA.

Configurez les variables privées dans le panneau d’hébergement, jamais dans le dépôt. Si le plan choisi ne supporte que les fichiers statiques, l’API doit être hébergée séparément sur un environnement serveur compatible. Ne contournez pas cette limite en exposant des secrets au navigateur. Configurez le domaine après confirmation, activez HTTPS et renseignez ensuite `NUXT_PUBLIC_SITE_URL`.

## Maintenance avant production

- Remplacer les placeholders de branches avec les informations vérifiées.
- Ajouter le menu/les images réels avec leur autorisation et leurs textes alternatifs.
- Compléter la notice de confidentialité avec l’identité du responsable, les coordonnées, la durée de conservation et les droits applicables.
- Configurer et tester les identifiants SMTP et reCAPTCHA de production.
- Valider les limites SMTP, le débit par IP derrière le proxy de l’hébergeur et la procédure de sauvegarde/rotation des secrets.
- Vérifier les pages, formulaires, navigation clavier, mises en page mobile/tablette/desktop, headers, canonical, sitemap et robots après chaque mise à jour.

# memepas.dev

Code du site [memepas.dev](https://memepas.dev) : présentation et téléchargement des
applications Meme-Pas-Dev, en français (`/fr/`) et en anglais (`/en/`).

- Aucun cookie, aucun pistage, aucune ressource externe : polices, icônes et scripts sont
  servis par le site lui-même.
- Thème clair et sombre, fonctionnement sans JavaScript.
- Les versions des applications sont lues dans l'API GitHub au moment de la construction,
  jamais depuis le navigateur des visiteurs.

## Technologies

- [SvelteKit](https://svelte.dev/docs/kit) et Svelte 5, toutes les pages générées à la
  construction (`adapter-static`).
- Cloudflare Workers avec ressources statiques. Le Worker (`worker/index.ts`) ne sert que
  la racine (choix de la langue selon le navigateur) et `/.well-known/`.
- Polices Bricolage Grotesque, Geist et Inter (SIL OFL), icônes Lucide (ISC).

## Développement

Node.js 22 ou plus récent.

```bash
npm ci
npm run dev       # serveur de développement
npm run check     # vérification des types
npm run build     # génération du site dans build/
npm run preview   # construction puis serveur local Cloudflare
```

## Organisation

```
src/routes/[lang=lang]/   pages (accueil, application, téléchargements, informations légales)
src/lib/apps/             catalogue des applications
src/lib/i18n/             textes de l'interface (fr, en)
static/                   fichiers servis tels quels (images, en-têtes de sécurité)
worker/                   Worker Cloudflare
```

## Publication

Chaque version du site est une étiquette `vX.Y.Z` de ce dépôt ; le site est aussi
reconstruit chaque nuit pour reprendre les dernières versions des applications. Le
journal des modifications est dans [CHANGELOG.md](CHANGELOG.md).

## Licence

Le code du site est publié sous [licence MIT](LICENSE). Les noms Meme-Pas-Dev et des
applications, les logos, les icônes, les captures d'écran et les images d'aperçu en sont
exclus. Les polices et icônes tierces gardent leur propre licence.

## Contact

Les issues ne sont pas ouvertes sur ce dépôt. Pour toute remarque sur le site (contenu,
accessibilité, erreur) : [contact@memepas.dev](mailto:contact@memepas.dev). Les retours
sur une application se font dans le dépôt de l'application.

## Sécurité

Voir [SECURITY.md](SECURITY.md).

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Site entièrement statique : chaque page est générée au moment de la construction.
		adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', strict: true }),
		prerender: {
			entries: ['/fr/', '/en/', '/sitemap.xml'],
			handleHttpError: 'fail',
			handleMissingId: 'fail'
		},
		// Politique de sécurité du contenu : rien d'autre que le site lui-même.
		// SvelteKit ajoute l'empreinte de ses propres scripts en ligne.
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				// Seule exception : l'attribut style de la zone d'annonce de SvelteKit (lecteurs d'écran).
				// app.css la masque aussi, au cas où une mise à jour de SvelteKit changerait cette empreinte.
				'style-src': ['self', 'unsafe-hashes', 'sha256-S8qMpvofolR8Mpjy4kQvEm7m1q8clzU4dfDH0AmvZjo='],
				'img-src': ['self'],
				'font-src': ['self'],
				'connect-src': ['self'],
				'object-src': ['none'],
				'base-uri': ['self'],
				'form-action': ['none']
			}
		}
	}
};

export default config;

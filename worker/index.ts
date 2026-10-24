// Worker de memepas.dev.
//
// Les pages du site sont des fichiers statiques servis directement par Cloudflare.
// Ce Worker n'est appelé que pour la racine « / », les adresses courtes des applications
// (/quayline) et /.well-known/* (voir run_worker_first dans wrangler.jsonc) :
// - la racine redirige vers /fr/ ou /en/ selon la langue préférée du navigateur, et
//   /quayline vers /fr/quayline/ ou /en/quayline/ (cible du sous-domaine
//   quayline.memepas.dev, redirigé par une règle Cloudflare) ;
// - /.well-known/ sert, selon le domaine, le fichier de vérification Flathub (site) et
//   le fichier apple-app-site-association propre à chaque application, sur son
//   sous-domaine (quayline.memepas.dev : clés FIDO2 de Quayline sur iPad).
// Aucun cookie, aucun stockage : seule l'en-tête Accept-Language de la requête est lue.

import flathubVerifiedApps from './well-known/org.flathub.VerifiedApps.txt';

interface Env {
	ASSETS: { fetch(request: Request): Promise<Response> };
	/** Team ID Apple, fourni au déploiement (secret APPLE_TEAM_ID du dépôt public). */
	APPLE_TEAM_ID?: string;
}

// Adresses redirigées vers la page de la langue préférée : chemin → page sous /<langue>/.
const LANG_REDIRECTS: Record<string, string> = {
	'/': '',
	'/quayline': 'quayline/',
	'/quayline/': 'quayline/'
};

const SECURITY_HEADERS = {
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'no-referrer',
	'Strict-Transport-Security': 'max-age=31536000'
};

type WellKnownFile = (env: Env) => { body: string; type: string };

// Sous-domaine de chaque application : page de l'application (sous /<langue>/) et
// identifiant de son bundle Apple. Chaque sous-domaine sert son propre fichier
// apple-app-site-association, qui ne déclare que cette application ; sa racine mène à la
// page de l'application sur memepas.dev, et une règle Cloudflare y envoie aussi ses
// autres adresses.
const SITE_ORIGIN = 'https://memepas.dev';
const APP_DOMAINS: Record<string, { page: string; bundleId: string }> = {
	'quayline.memepas.dev': { page: 'quayline/', bundleId: 'dev.memepas.quayline' }
};

// Fichier provisoire de memepas.dev, utilisé par Quayline avant son passage à
// quayline.memepas.dev : à retirer quand Quayline n'en dépendra plus.
const SITE_APPLE_APPS = ['dev.memepas.quayline'];

// Fichiers du site (memepas.dev). Un fichier vide répond 404.
const SITE_WELL_KNOWN: Record<string, WellKnownFile> = {
	'/.well-known/org.flathub.VerifiedApps.txt': () => ({
		body: flathubVerifiedApps,
		type: 'text/plain; charset=utf-8'
	}),
	'/.well-known/apple-app-site-association': (env) => appleAppSiteAssociation(env, SITE_APPLE_APPS)
};

/** Fichiers /.well-known/ servis sur un domaine. */
function wellKnownFiles(hostname: string): Record<string, WellKnownFile> {
	if (!Object.hasOwn(APP_DOMAINS, hostname)) return SITE_WELL_KNOWN;
	const { bundleId } = APP_DOMAINS[hostname];
	return {
		'/.well-known/apple-app-site-association': (env) => appleAppSiteAssociation(env, [bundleId])
	};
}

/**
 * Association d'un domaine avec des applications, lue par Apple (sans redirection, en
 * application/json) : le domaine peut alors servir de rpId à leurs clés FIDO2 sur iPad.
 * Le Team ID n'est pas dans le code : il est fourni au déploiement. Sans lui (ou s'il
 * n'a pas la forme attendue, dix lettres majuscules ou chiffres), l'adresse répond 404.
 */
function appleAppSiteAssociation(env: Env, bundleIds: string[]): { body: string; type: string } {
	const teamId = env.APPLE_TEAM_ID?.trim() ?? '';
	const body = /^[A-Z0-9]{10}$/.test(teamId)
		? JSON.stringify({ webcredentials: { apps: bundleIds.map((id) => `${teamId}.${id}`) } })
		: '';
	return { body, type: 'application/json' };
}

/**
 * Langue du site pour un en-tête Accept-Language : le français si la langue préférée
 * du navigateur (la mieux notée) est une variante du français, l'anglais dans tous les
 * autres cas (anglais, autre langue, en-tête absent).
 */
function preferredLang(acceptLanguage: string | null): 'fr' | 'en' {
	if (!acceptLanguage) return 'en';
	let best = { tag: '', q: -1 };
	for (const part of acceptLanguage.split(',')) {
		const [rawTag, ...params] = part.trim().split(';');
		const tag = rawTag.trim().toLowerCase();
		if (!tag) continue;
		const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
		const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
		if (Number.isNaN(q)) continue;
		// À note égale, l'ordre de l'en-tête départage : la première langue l'emporte.
		if (q > best.q) best = { tag, q };
	}
	return best.q > 0 && (best.tag === 'fr' || best.tag.startsWith('fr-')) ? 'fr' : 'en';
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const { pathname } = url;

		if (pathname in LANG_REDIRECTS) {
			const lang = preferredLang(request.headers.get('Accept-Language'));
			// Sur le sous-domaine d'une application : sa page, sur memepas.dev.
			const target = Object.hasOwn(APP_DOMAINS, url.hostname)
				? new URL(`/${lang}/${APP_DOMAINS[url.hostname].page}`, SITE_ORIGIN)
				: new URL(`/${lang}/${LANG_REDIRECTS[pathname]}`, url);
			target.search = url.search;
			return new Response(null, {
				status: 302,
				headers: {
					Location: target.toString(),
					// La réponse dépend de la langue du navigateur : jamais de cache partagé.
					Vary: 'Accept-Language',
					'Cache-Control': 'private, no-store',
					'Content-Language': lang,
					...SECURITY_HEADERS
				}
			});
		}

		const wellKnown = wellKnownFiles(url.hostname);
		if (Object.hasOwn(wellKnown, pathname)) {
			const { body, type } = wellKnown[pathname](env);
			if (body.trim() === '') {
				return new Response('Not Found\n', {
					status: 404,
					headers: { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS }
				});
			}
			if (request.method !== 'GET' && request.method !== 'HEAD') {
				return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD', ...SECURITY_HEADERS } });
			}
			return new Response(request.method === 'HEAD' ? null : body, {
				status: 200,
				headers: {
					'Content-Type': type,
					'Cache-Control': 'public, max-age=300',
					...SECURITY_HEADERS
				}
			});
		}

		return env.ASSETS.fetch(request);
	}
};

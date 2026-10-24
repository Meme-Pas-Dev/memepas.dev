// Worker de memepas.dev.
//
// Les pages du site sont des fichiers statiques servis directement par Cloudflare.
// Ce Worker n'est appelé que pour la racine « / », les adresses courtes des applications
// (/quayline) et /.well-known/* (voir run_worker_first dans wrangler.jsonc) :
// - la racine redirige vers /fr/ ou /en/ selon la langue préférée du navigateur, et
//   /quayline vers /fr/quayline/ ou /en/quayline/ (cible du sous-domaine
//   quayline.memepas.dev, redirigé par une règle Cloudflare) ;
// - /.well-known/ sert le fichier de vérification Flathub tel quel et le fichier
//   apple-app-site-association (clés FIDO2 de Quayline sur iPad).
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

// Fichiers servis tels quels. Un fichier vide répond 404.
const WELL_KNOWN: Record<string, (env: Env) => { body: string; type: string }> = {
	'/.well-known/org.flathub.VerifiedApps.txt': () => ({
		body: flathubVerifiedApps,
		type: 'text/plain; charset=utf-8'
	}),
	'/.well-known/apple-app-site-association': appleAppSiteAssociation
};

/**
 * Association du domaine avec Quayline, lue par Apple (sans redirection, en
 * application/json) : memepas.dev peut alors servir de rpId aux clés FIDO2 sur iPad.
 * Le Team ID n'est pas dans le code : il est fourni au déploiement. Sans lui (ou s'il
 * n'a pas la forme attendue, dix lettres majuscules ou chiffres), l'adresse répond 404.
 */
function appleAppSiteAssociation(env: Env): { body: string; type: string } {
	const teamId = env.APPLE_TEAM_ID?.trim() ?? '';
	const body = /^[A-Z0-9]{10}$/.test(teamId)
		? JSON.stringify({ webcredentials: { apps: [`${teamId}.dev.memepas.quayline`] } })
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
			const target = new URL(`/${lang}/${LANG_REDIRECTS[pathname]}`, url);
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

		if (pathname in WELL_KNOWN) {
			const { body, type } = WELL_KNOWN[pathname](env);
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

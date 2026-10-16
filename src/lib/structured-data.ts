import type { AppDefinition, ResolvedRelease } from '$lib/apps';
import { screenshotUrl } from '$lib/apps/types';
import { site } from '$lib/config';
import { localize, t, type Lang } from '$lib/i18n';

// Données structurées schema.org (JSON-LD) : elles décrivent le site et les applications
// aux moteurs de recherche et aux assistants IA, sans qu'ils aient à interpréter la page.

const organization = {
	'@type': 'Organization',
	'@id': `${site.url}/#organization`,
	name: site.name,
	url: `${site.url}/`,
	logo: `${site.url}/favicon.svg`,
	sameAs: [site.github]
};

/** Accueil : le site et son éditeur. */
export function siteJsonLd(lang: Lang) {
	const d = t(lang);
	return {
		'@context': 'https://schema.org',
		'@graph': [
			organization,
			{
				'@type': 'WebSite',
				'@id': `${site.url}/#website`,
				name: site.name,
				url: `${site.url}${localize(lang, '/')}`,
				description: d.meta.homeDescription,
				inLanguage: lang,
				publisher: { '@id': organization['@id'] }
			}
		]
	};
}

/** Page d'une application : fiche SoftwareApplication. */
export function appJsonLd(app: AppDefinition, release: ResolvedRelease, lang: Lang) {
	const c = app.content[lang];
	const url = `${site.url}${localize(lang, `/${app.slug}/`)}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		'@id': `${url}#software`,
		name: app.name,
		description: `${c.tagline} ${c.summary}`,
		url,
		applicationCategory: app.category,
		operatingSystem: app.operatingSystem,
		inLanguage: ['fr', 'en'],
		isAccessibleForFree: true,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
		...(app.icon ? { image: `${site.url}${app.icon}` } : {}),
		...(app.screenshots.length > 0
			? { screenshot: app.screenshots.map((s) => `${site.url}${screenshotUrl(app.slug, lang, s.name, 1280)}`) }
			: {}),
		...(release.version ? { softwareVersion: release.version } : {}),
		...(release.date ? { dateModified: release.date } : {}),
		...(app.license ? { license: app.license.url } : {}),
		downloadUrl: release.notesUrl,
		releaseNotes: release.notesUrl,
		featureList: c.features.map((f) => f.title),
		sameAs: [`https://github.com/${app.repo}`],
		author: { '@id': organization['@id'] },
		publisher: organization
	};
}

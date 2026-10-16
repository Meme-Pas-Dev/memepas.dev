import { appList } from '$lib/apps';
import { site } from '$lib/config';
import { defaultLang, localize } from '$lib/i18n';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	const paths = ['/', ...appList.map((app) => `/${app.slug}/`), '/downloads/', '/legal/'];
	const urls = paths
		.map((path) => {
			const xDefault = path === '/' ? `${site.url}/` : `${site.url}${localize(defaultLang, path)}`;
			const alternates =
				(['fr', 'en'] as const)
					.map((lang) => `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${site.url}${localize(lang, path)}"/>`)
					.join('') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`;
			return (['fr', 'en'] as const)
				.map((lang) => `  <url>\n    <loc>${site.url}${localize(lang, path)}</loc>${alternates}\n  </url>`)
				.join('\n');
		})
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

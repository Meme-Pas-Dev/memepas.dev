import type { Handle } from '@sveltejs/kit';

// Renseigne l'attribut lang de <html> selon la langue de la page.
export const handle: Handle = ({ event, resolve }) => {
	const lang = event.params.lang === 'fr' ? 'fr' : 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};

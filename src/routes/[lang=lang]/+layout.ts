import type { Lang } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const lang: Lang = params.lang === 'fr' ? 'fr' : 'en';
	return { lang };
};

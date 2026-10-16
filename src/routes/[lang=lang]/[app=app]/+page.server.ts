import { apps } from '$lib/apps';
import { resolveRelease } from '$lib/server/releases';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const app = apps[params.app];
	return { slug: app.slug, release: await resolveRelease(app) };
};

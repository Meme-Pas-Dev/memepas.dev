import { appList } from '$lib/apps';
import { resolveRelease } from '$lib/server/releases';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const releases = await Promise.all(appList.map(async (app) => ({ slug: app.slug, release: await resolveRelease(app) })));
	return { releases };
};

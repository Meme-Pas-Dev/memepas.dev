import type { ParamMatcher } from '@sveltejs/kit';
import { apps } from '$lib/apps';

export const match: ParamMatcher = (param) => Object.hasOwn(apps, param);

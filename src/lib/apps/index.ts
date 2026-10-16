import { quayline } from './quayline';
import type { AppDefinition } from './types';

/** Catalogue des applications, dans l'ordre d'affichage. */
export const apps: Record<string, AppDefinition> = {
	quayline
};

export const appList: AppDefinition[] = Object.values(apps);

export type { AppDefinition, Platform, ResolvedFile, ResolvedRelease } from './types';

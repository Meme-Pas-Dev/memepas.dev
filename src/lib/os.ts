import type { Platform } from '$lib/apps';

/**
 * Système du visiteur, détecté dans le navigateur avant l'affichage par static/platform.js
 * (attribut data-platform de la racine). Rien n'est transmis.
 * Renvoie null côté serveur, et pour les téléphones, tablettes et systèmes non reconnus.
 */
export function detectPlatform(): Platform | null {
	if (typeof document === 'undefined') return null;
	const platform = document.documentElement.dataset.platform;
	return platform === 'linux' || platform === 'macos' || platform === 'windows' ? platform : null;
}

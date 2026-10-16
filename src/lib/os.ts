import type { Platform } from '$lib/apps';

interface UADataNavigator extends Navigator {
	userAgentData?: { platform?: string; mobile?: boolean };
}

/**
 * Détecte le système du visiteur, dans le navigateur uniquement (rien n'est transmis).
 * Renvoie null pour les téléphones, tablettes et systèmes non reconnus.
 */
export function detectPlatform(): Platform | null {
	if (typeof navigator === 'undefined') return null;
	const nav = navigator as UADataNavigator;
	const hint = nav.userAgentData;
	if (hint?.mobile) return null;
	const platform = (hint?.platform ?? '').toLowerCase();
	const ua = nav.userAgent;

	if (/android|iphone|ipad|ipod|mobile/i.test(ua)) return null;
	if (platform === 'windows' || /windows nt/i.test(ua)) return 'windows';
	if (platform === 'macos' || /macintosh|mac os x/i.test(ua)) {
		// Un iPad récent se présente comme un Mac : on l'écarte grâce à l'écran tactile.
		if (nav.maxTouchPoints > 1) return null;
		return 'macos';
	}
	if (platform === 'linux' || /linux|x11|cros/i.test(ua)) return 'linux';
	return null;
}

import { fr } from './fr';
import { en } from './en';

export type Lang = 'fr' | 'en';
export const langs: Lang[] = ['fr', 'en'];

export type Dictionary = typeof fr;

const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function t(lang: Lang | undefined): Dictionary {
	return dictionaries[lang ?? defaultLang];
}

/** Langue par défaut : celle des visiteurs qui ne lisent ni le français ni l'anglais. */
export const defaultLang: Lang = 'en';

/** Chemin d'une page dans la langue donnée : /fr/… ou /en/… */
export function localize(lang: Lang | undefined, path: string): string {
	return `/${lang ?? defaultLang}${path}`;
}

/** Chemin de la page courante sans le préfixe de langue. */
export function unlocalize(pathname: string): string {
	const match = /^\/(fr|en)(\/.*)?$/.exec(pathname);
	if (!match) return pathname;
	return match[2] ?? '/';
}

/** Langue d'une adresse d'après son préfixe (langue par défaut sinon). */
export function langFromPath(pathname: string): Lang {
	return pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : defaultLang;
}

export function formatDate(lang: Lang, iso: string): string {
	return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(iso));
}

export function formatSize(lang: Lang, bytes: number): string {
	const mb = bytes / (1024 * 1024);
	const value = new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
		maximumFractionDigits: mb < 10 ? 1 : 0
	}).format(mb);
	return lang === 'en' ? `${value} MB` : `${value} Mo`;
}

import type { Lang } from '$lib/i18n';

export type Platform = 'linux' | 'macos' | 'windows';

export type FeatureIcon = 'terminal' | 'edit' | 'vault' | 'key' | 'clock' | 'shield';

/** Un fichier publié dans chaque release GitHub de l'application. */
export interface ReleaseFileSpec {
	id: string;
	platform: Platform;
	/** Reconnaît le fichier parmi les éléments de la release (le nom contient la version). */
	pattern: RegExp;
	/** Nom affiché quand la release n'a pas pu être lue. */
	example: string;
	/** Fichiers d'empreintes associés, publiés dans la même release. */
	checksums: string[];
}

export interface Screenshot {
	name: string;
	/** Dimensions d'origine (pour réserver la place et éviter les décalages à l'affichage). */
	width: number;
	height: number;
}

/** Paragraphe ou bloc de commandes. Dans le texte, `code` et **gras** sont mis en forme. */
export type Block = { type: 'p'; text: string } | { type: 'code'; code: string };

export interface AppContent {
	/** Phrase d'accroche (titre de la page). */
	tagline: string;
	summary: string;
	/** Texte court de la carte sur l'accueil. */
	card: string;
	platforms: string;
	badges: string[];
	files: Record<string, { label: string; note: string }>;
	smartscreen: string;
	featuresTitle: string;
	features: { icon: FeatureIcon; title: string; text: string }[];
	security: {
		title: string;
		intro: string;
		chain: { label: string; detail?: string; highlight?: boolean }[];
		chainCaption: string;
		points: { title: string; text: string }[];
		warning: string;
		/** Lien vers la procédure à suivre en cas d'oubli du mot de passe. */
		resetLink?: string;
		resetHref?: string;
		modelLink: string;
		reportLink: string;
	};
	install: { id: string; label: string; platform: Platform; blocks: Block[] }[];
	privacy: string;
	license: string;
	screenshotAlt: string[];
}

export interface AppDefinition {
	slug: string;
	name: string;
	/** Dépôt GitHub « organisation/nom ». */
	repo: string;
	/** Dépôt COPR pour Fedora, s'il existe. */
	copr?: string;
	files: ReleaseFileSpec[];
	/** Catégorie schema.org (ex. « DeveloperApplication »), pour les données structurées. */
	category: string;
	/** Systèmes pris en charge, tels qu'annoncés aux moteurs (ex. « Linux, macOS, Windows 11 »). */
	operatingSystem: string;
	/** Licence du logiciel. */
	license?: { name: string; url: string };
	/**
	 * Classe CSS du nom de l'application, pour l'écrire dans la police de son interface
	 * (classes définies dans app.css, ex. « app-name-inter »).
	 */
	nameClass?: string;
	/** Icône de l'application, dans static/ (ex. « /apps/quayline/icon.svg »). */
	icon?: string;
	/**
	 * Captures d'écran, une par langue, au format WebP en deux largeurs :
	 * static/apps/<slug>/<langue>/<nom>-1280.webp et <nom>-2560.webp.
	 * Le texte alternatif de chacune est dans content[lang].screenshotAlt, dans le même ordre.
	 */
	screenshots: Screenshot[];
	/** Capture de l'accueil, en thème clair et sombre (noms de captures ci-dessus). */
	heroScreenshot?: { light: string; dark: string };
	content: Record<Lang, AppContent>;
}

export interface ResolvedFile {
	id: string;
	platform: Platform;
	name: string;
	url: string;
	/** Taille en octets, connue seulement si la release a pu être lue. */
	size: number | null;
	checksums: { name: string; url: string }[];
}

export interface ResolvedRelease {
	/** Numéro de version (sans « v »), ou null si la release n'a pas pu être lue. */
	version: string | null;
	/** Date de publication (ISO 8601), ou null. */
	date: string | null;
	notesUrl: string;
	allUrl: string;
	files: ResolvedFile[];
}

export const SCREENSHOT_WIDTHS = [1280, 2560] as const;

export function screenshotUrl(slug: string, lang: Lang, name: string, width: number): string {
	return `/apps/${slug}/${lang}/${name}-${width}.webp`;
}

export function screenshotSrcset(slug: string, lang: Lang, name: string): string {
	return SCREENSHOT_WIDTHS.map((w) => `${screenshotUrl(slug, lang, name, w)} ${w}w`).join(', ');
}

import type { ParamMatcher } from '@sveltejs/kit';

// Chaque langue a son préfixe : /fr/… et /en/…
// La racine « / » choisit la langue du visiteur (voir worker/index.ts).
export const match: ParamMatcher = (param) => param === 'fr' || param === 'en';

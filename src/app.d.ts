// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface PageData {
			lang?: import('$lib/i18n').Lang;
		}
	}
}

export {};

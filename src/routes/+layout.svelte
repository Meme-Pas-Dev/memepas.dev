<script lang="ts">
	import '@fontsource-variable/geist';
	import '@fontsource-variable/geist-mono';
	import '@fontsource-variable/bricolage-grotesque';
	// Police de l'interface de Quayline, pour écrire son nom comme dans l'application.
	import '@fontsource-variable/inter';
	// Polices du texte et des titres (alphabet latin), préchargées pour être prêtes au premier
	// affichage : la page ne bouge pas quand elles remplacent la police de secours.
	import geistLatin from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
	import bricolageLatin from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { langFromPath, type Lang } from '$lib/i18n';

	let { children } = $props();
	const lang: Lang = $derived(page.data.lang ?? langFromPath(page.url.pathname));
</script>

<svelte:head>
	<link rel="preload" href={geistLatin} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={bricolageLatin} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<Header {lang} />
<main id="contenu" tabindex="-1">
	{@render children()}
</main>
<Footer {lang} />

<style>
	main:focus {
		outline: none;
	}
</style>

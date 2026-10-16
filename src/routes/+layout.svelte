<script lang="ts">
	import '@fontsource-variable/geist';
	import '@fontsource-variable/geist-mono';
	import '@fontsource-variable/bricolage-grotesque';
	// Police de l'interface de Quayline, pour écrire son nom comme dans l'application.
	import '@fontsource-variable/inter';
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { langFromPath, type Lang } from '$lib/i18n';

	let { children } = $props();
	const lang: Lang = $derived(page.data.lang ?? langFromPath(page.url.pathname));
</script>

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

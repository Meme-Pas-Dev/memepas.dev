<script lang="ts">
	import { page } from '$app/state';
	import { langFromPath, localize, t, type Lang } from '$lib/i18n';

	const lang: Lang = $derived(langFromPath(page.url.pathname));
	const d = $derived(t(lang));
</script>

<svelte:head>
	<title>{d.notFound.title} — Meme-Pas-Dev</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container error">
	<p class="eyebrow">{page.status}</p>
	<h1 class="section-title">{d.notFound.title}</h1>
	<p class="lead">{d.notFound.text}</p>
	<p><a class="btn btn-primary" href={localize(lang, '/')}>{d.notFound.back}</a></p>
</div>

<style>
	.error {
		padding-block: 120px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.error p {
		margin: 0;
	}
</style>

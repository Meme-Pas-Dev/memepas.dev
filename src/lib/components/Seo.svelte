<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';
	import { defaultLang, localize, unlocalize, type Lang } from '$lib/i18n';

	let {
		title,
		description,
		lang,
		image,
		imageAlt,
		jsonLd
	}: {
		title: string;
		description: string;
		lang: Lang;
		/** Image d'aperçu 1200×630 (réseaux sociaux, messageries), dans static/og/. Par défaut : celle du site. */
		image?: string;
		imageAlt?: string;
		/** Données structurées schema.org (JSON-LD), lues par les moteurs de recherche et les assistants IA. */
		jsonLd?: Record<string, unknown>;
	} = $props();

	const path = $derived(unlocalize(page.url.pathname));
	const ogImage = $derived(`${site.url}${image ?? `/og/site-${lang}.png`}`);
	// Version par défaut : la racine pour l'accueil (elle choisit la langue), l'anglais ailleurs.
	const xDefault = $derived(path === '/' ? `${site.url}/` : `${site.url}${localize(defaultLang, path)}`);
	// « < » échappé pour que le contenu ne puisse jamais fermer la balise <script>.
	const jsonLdTag = $derived(
		jsonLd
			? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` + 'script>'
			: ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{site.url}{localize(lang, path)}" />
	<link rel="alternate" hreflang="fr" href="{site.url}{localize('fr', path)}" />
	<link rel="alternate" hreflang="en" href="{site.url}{localize('en', path)}" />
	<link rel="alternate" hreflang="x-default" href={xDefault} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{site.url}{localize(lang, path)}" />
	<meta property="og:locale" content={lang === 'en' ? 'en_GB' : 'fr_FR'} />
	<meta property="og:locale:alternate" content={lang === 'en' ? 'fr_FR' : 'en_GB'} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt ?? title} />
	<meta name="twitter:card" content="summary_large_image" />
	{#if jsonLdTag}
		{@html jsonLdTag}
	{/if}
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { localize, t, unlocalize, type Lang } from '$lib/i18n';
	import { apps } from '$lib/apps';
	import Logo from './Logo.svelte';
	import Wordmark from './Wordmark.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { lang }: { lang: Lang } = $props();
	const d = $derived(t(lang));
	const otherLang: Lang = $derived(lang === 'fr' ? 'en' : 'fr');
	const otherHref = $derived(localize(otherLang, unlocalize(page.url.pathname)));
	const current = $derived(unlocalize(page.url.pathname));
	const onHome = $derived(current === '/');

	// Sur l'accueil, le lien actif suit la section affichée (Accueil, Applications, À propos).
	// Sans JavaScript, « Accueil » reste le lien actif de toute la page.
	const sections = ['applications', 'pourquoi'] as const;
	let section = $state<(typeof sections)[number] | null>(null);
	onMount(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			if (!onHome) return (section = null);
			const offset = Math.max((parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) + 32, innerHeight * 0.35);
			const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
			let found: typeof section = null;
			for (const id of sections) {
				const top = document.getElementById(id)?.getBoundingClientRect().top;
				if (top !== undefined && (top <= offset + 1 || (atBottom && top < innerHeight))) found = id;
			}
			section = found;
		};
		const schedule = () => (frame ||= requestAnimationFrame(update));
		addEventListener('scroll', schedule, { passive: true });
		addEventListener('resize', schedule);
		addEventListener('hashchange', schedule);
		update();
		return () => {
			removeEventListener('scroll', schedule);
			removeEventListener('resize', schedule);
			removeEventListener('hashchange', schedule);
			cancelAnimationFrame(frame);
		};
	});
	$effect(() => {
		if (!onHome) section = null;
	});
	const onApp = $derived(Object.keys(apps).some((slug) => current.startsWith(`/${slug}/`)));

	// Sur l'accueil, « Accueil » remonte en haut de la page au lieu de la recharger.
	// Sans JavaScript, le lien mène simplement à l'accueil.
	function goHome(event: MouseEvent) {
		if (!onHome || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
		event.preventDefault();
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
	}
</script>

<a class="skip-link" href="#contenu">{d.nav.skip}</a>
<header class="header">
	<div class="container bar">
		<a class="brand" href={localize(lang, '/')}>
			<Logo size={34} />
			<Wordmark />
		</a>
		<nav aria-label={d.nav.label}>
			<ul>
				<li>
					<a href={localize(lang, '/')} data-label={d.nav.home} aria-current={onHome && !section ? 'page' : undefined} onclick={goHome}>{d.nav.home}</a>
				</li>
				<li>
					<a href={localize(lang, '/#applications')} data-label={d.nav.apps} aria-current={onApp ? 'page' : section === 'applications' ? 'location' : undefined}>{d.nav.apps}</a>
				</li>
				<li>
					<a href={localize(lang, '/downloads/')} data-label={d.nav.downloads} aria-current={current === '/downloads/' ? 'page' : undefined}>{d.nav.downloads}</a>
				</li>
				<li>
					<a href={localize(lang, '/#pourquoi')} data-label={d.nav.about} aria-current={section === 'pourquoi' ? 'location' : undefined}>{d.nav.about}</a>
				</li>
			</ul>
		</nav>
		<div class="controls">
			<a class="lang" href={otherHref} hreflang={otherLang} lang={otherLang} aria-label={d.nav.otherLangLabel}>{d.nav.otherLangShort}</a>
			<ThemeToggle toDark={d.nav.themeToDark} toLight={d.nav.themeToLight} />
		</div>
	</div>
</header>

<style>
	/* L'en-tête reste visible pendant le défilement. */
	.header {
		position: sticky;
		top: 0;
		z-index: 20;
		border-bottom: 1px solid var(--line);
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: saturate(1.4) blur(10px);
		-webkit-backdrop-filter: saturate(1.4) blur(10px);
	}
	@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
		.header {
			background: var(--bg);
		}
	}
	.bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-block: 12px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: var(--ink);
		font-size: 21px;
	}
	nav {
		margin-left: auto;
	}
	.controls {
		display: flex;
		align-items: center;
		gap: 4px;
		padding-left: 10px;
		border-left: 1px solid var(--line);
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	nav a,
	.lang {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 14px;
		border-radius: 8px;
		color: var(--ink);
		text-decoration: none;
		font-size: 15px;
		font-weight: 500;
	}
	nav a:hover,
	.lang:hover {
		background: var(--chip);
	}
	nav a[aria-current] {
		background: var(--chip);
		font-weight: 600;
	}
	/* Réserve la largeur du texte en gras : le lien actif ne décale pas ses voisins. */
	nav a {
		flex-direction: column;
		justify-content: center;
	}
	nav a::after {
		content: attr(data-label);
		content: attr(data-label) / '';
		height: 0;
		overflow: hidden;
		visibility: hidden;
		font-weight: 600;
		user-select: none;
		pointer-events: none;
	}
	.lang {
		padding: 0 12px;
		font-family: var(--font-mono);
		font-size: 13px;
	}
	/* Sur téléphone : logo et réglages en haut, navigation sur toute la largeur en dessous. */
	@media (max-width: 720px) {
		.bar {
			padding-block: 8px 4px;
			row-gap: 2px;
		}
		.brand {
			font-size: 19px;
		}
		.controls {
			order: 2;
			margin-left: auto;
			border-left: none;
			padding-left: 0;
		}
		nav {
			order: 3;
			width: calc(100% + 12px);
			margin-left: -6px;
		}
		ul {
			flex-wrap: nowrap;
			justify-content: space-between;
			gap: 0;
			overflow-x: auto;
		}
		nav a {
			padding: 0 6px;
			font-size: 14px;
			white-space: nowrap;
		}
	}
	/* Très petits écrans (360–380 px) : les quatre liens tiennent encore sur la ligne. */
	@media (max-width: 380px) {
		nav a {
			padding: 0 4px;
			font-size: 13px;
		}
	}
</style>

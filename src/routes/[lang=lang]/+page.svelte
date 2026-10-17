<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { appList } from '$lib/apps';
	import { screenshotSrcset, screenshotUrl } from '$lib/apps/types';
	import { site } from '$lib/config';
	import { localize, t } from '$lib/i18n';
	import type { Picto as PictoSpec } from '$lib/icons';
	import AppIcon from '$lib/components/AppIcon.svelte';
	import Picto from '$lib/components/Picto.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { siteJsonLd } from '$lib/structured-data';

	let { data } = $props();
	const lang = $derived(data.lang);
	const d = $derived(t(lang));
	const principlePictos: PictoSpec[] = [
		{ icon: 'target', tint: 'sand' },
		{ icon: 'code-xml', tint: 'lilac' },
		{ icon: 'shield-check', tint: 'mint' }
	];
	const whyPictos: PictoSpec[] = [
		{ icon: 'sparkles', tint: 'lilac' },
		{ icon: 'gift', tint: 'sand' }
	];

	// Capture de l'accueil : la première application qui en propose une.
	const hero = $derived.by(() => {
		const app = appList.find((a) => a.heroScreenshot);
		if (!app?.heroScreenshot) return null;
		const index = app.screenshots.findIndex((s) => s.name === app.heroScreenshot?.light);
		return {
			slug: app.slug,
			light: app.heroScreenshot.light,
			dark: app.heroScreenshot.dark,
			alt: `${app.name} — ${app.content[lang].screenshotAlt[index] ?? ''}`,
			caption: `${app.name} — ${app.content[lang].tagline}`
		};
	});
</script>

<Seo title={d.meta.homeTitle} description={d.meta.homeDescription} {lang} jsonLd={siteJsonLd(lang)} />

<section class="container hero">
	<div class="hero-text">
		<p class="badge"><span class="dot" aria-hidden="true"></span>{d.home.badge}</p>
		<h1>{d.home.title}</h1>
		<p class="lead intro">{d.home.intro}</p>
		<div class="ctas">
			<a class="btn btn-primary" href="#applications">{d.home.ctaApps} <ArrowRight size={18} /></a>
			<a class="btn btn-secondary" href={localize(lang, '/downloads/')}>{d.home.ctaDownloads}</a>
		</div>
	</div>

	{#if hero}
		<figure class="hero-visual">
			<div class="window">
				<img
					class="shot shot-light"
					src={screenshotUrl(hero.slug, lang, hero.light, 1280)}
					srcset={screenshotSrcset(hero.slug, lang, hero.light)}
					sizes="(min-width: 1200px) 560px, 92vw"
					width="2560"
					height="1600"
					alt={hero.alt}
					loading="lazy"
				/>
				<img
					class="shot shot-dark"
					src={screenshotUrl(hero.slug, lang, hero.dark, 1280)}
					srcset={screenshotSrcset(hero.slug, lang, hero.dark)}
					sizes="(min-width: 1200px) 560px, 92vw"
					width="2560"
					height="1600"
					alt={hero.alt}
					loading="lazy"
				/>
			</div>
			<figcaption>{hero.caption}</figcaption>
		</figure>
	{/if}
</section>

<section class="principles" aria-label={d.home.principlesLabel}>
	<div class="container principles-grid">
		{#each d.home.principles as principle, i (principle.title)}
			{@const picto = principlePictos[i]}
			<div class="principle">
				<Picto icon={picto.icon} tint={picto.tint} size="lg" />
				<div>
					<h2>{principle.title}</h2>
					<p>{principle.text}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<section id="applications" class="container catalogue">
	<div class="section-head">
		<div>
			<p class="eyebrow">{d.home.catalogEyebrow}</p>
			<h2 class="section-title">{d.home.catalogTitle}</h2>
		</div>
		<a class="more" href={localize(lang, '/downloads/')}>{d.home.seeAllDownloads} →</a>
	</div>

	<div class="cards">
		{#each appList as app (app.slug)}
			<a class="card app-card" href={localize(lang, `/${app.slug}/`)}>
				{#if app.screenshots.length > 1}
					<div class="app-card-shot">
						<img
							src={screenshotUrl(app.slug, lang, app.screenshots[1].name, 1280)}
							width="1280"
							height="800"
							alt=""
							loading="lazy"
						/>
					</div>
				{/if}
				<div class="app-card-head">
					<AppIcon name={app.name} src={app.icon} size="sm" />
					<div>
						<h3><span class={app.nameClass}>{app.name}</span></h3>
						<p class="platforms">{app.content[lang].platforms}</p>
					</div>
				</div>
				<p class="app-card-text">{app.content[lang].card}</p>
				<ul class="highlights">
					{#each app.content[lang].highlights as highlight (highlight.label)}
						<li><Picto icon={highlight.icon} tint={highlight.tint} size="sm" />{highlight.label}</li>
					{/each}
				</ul>
				<span class="app-card-link">{d.home.discover} {app.name} →</span>
			</a>
		{/each}

		<div class="placeholder">
			<Picto icon="plus" tint="lilac" size="lg" />
			<div class="txt">
				<h3>{d.home.nextTitle}</h3>
				<p>{d.home.nextText}</p>
			</div>
		</div>
		<div class="placeholder">
			<Picto icon="folder-git" tint="mint" size="lg" />
			<div class="txt">
				<h3>{d.home.githubTitle}</h3>
				<p>{d.home.githubText} <a href={site.github}>github.com/Meme-Pas-Dev</a></p>
			</div>
		</div>
	</div>
</section>

<section id="pourquoi" class="container why">
	<div class="why-head">
		<p class="eyebrow">{d.home.whyEyebrow}</p>
		<h2 class="section-title">{d.home.whyTitle}</h2>
	</div>
	<div class="why-text">
		{#each d.home.why as paragraph, i (paragraph)}
			{@const picto = whyPictos[i]}
			<div class="why-item">
				{#if picto}<Picto icon={picto.icon} tint={picto.tint} />{/if}
				<p>{paragraph}</p>
			</div>
		{/each}
		<div class="disclaimer">
			<Picto icon="info" tint="mint" size="sm" />
			<p>{d.home.disclaimer}</p>
		</div>
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 64px;
		padding-block: clamp(56px, 9vw, 96px) clamp(56px, 8vw, 88px);
	}
	.hero-text {
		flex: 1 1 480px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}
	.badge {
		margin: 0;
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 12px;
		border-radius: 999px;
		background: var(--surface);
		border: 1px solid var(--line);
		font-size: 14px;
		color: var(--muted);
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--accent);
	}
	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.5rem, 5vw, 4.2rem);
		line-height: 1.04;
		letter-spacing: -0.03em;
	}
	.intro {
		margin: 0;
		font-size: 19px;
		max-width: 560px;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.hero-visual {
		flex: 1 1 400px;
		min-width: 0;
		margin: 0;
	}
	.window {
		border-radius: 14px;
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
		overflow: hidden;
		line-height: 0;
		background: var(--surface);
	}
	.shot {
		width: 100%;
		height: auto;
	}
	/* La capture suit le thème du site (système ou choix du visiteur). */
	.shot-dark {
		display: none;
	}
	:global(:root[data-theme='dark']) .shot-light {
		display: none;
	}
	:global(:root[data-theme='dark']) .shot-dark {
		display: block;
	}
	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .shot-light {
			display: none;
		}
		:global(:root:not([data-theme='light'])) .shot-dark {
			display: block;
		}
	}
	figcaption {
		margin-top: 12px;
		font-size: 13px;
		color: var(--subtle);
		text-align: right;
	}

	.principles {
		border-block: 1px solid var(--line);
		background: var(--surface);
	}
	.principles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 40px;
		padding-block: 48px;
	}
	.principle {
		display: flex;
		align-items: flex-start;
		gap: 16px;
	}
	.principle h2 {
		margin: 0 0 6px;
		font-size: 17px;
		font-weight: 600;
	}
	.principle p {
		margin: 0;
		color: var(--muted);
		line-height: 1.55;
		font-size: 15px;
	}

	.catalogue {
		padding-block: clamp(72px, 10vw, 104px) 40px;
		scroll-margin-top: 16px;
	}
	.section-head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 40px;
	}
	.more {
		font-weight: 600;
		font-size: 15px;
		padding: 12px 0;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
		gap: 24px;
	}
	.app-card {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 28px;
		overflow: hidden;
		text-decoration: none;
		color: var(--ink);
		transition: border-color 0.15s;
	}
	.app-card:hover {
		color: var(--ink);
		border-color: var(--accent);
	}
	.app-card-shot {
		margin: -28px -28px 6px;
		padding: 24px 24px 0;
		background: var(--accent-soft);
		line-height: 0;
	}
	.app-card-shot img {
		width: 100%;
		height: auto;
		border-radius: 8px 8px 0 0;
		box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.35);
	}
	.app-card-head {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.app-card h3 {
		margin: 0;
		font-size: 19px;
		font-weight: 600;
	}
	.platforms {
		margin: 2px 0 0;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--subtle);
	}
	.app-card-text {
		margin: 0;
		color: var(--muted);
		line-height: 1.55;
		font-size: 15px;
		flex: 1;
	}
	.highlights {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 16px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 14px;
		color: var(--muted);
	}
	.highlights li {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.app-card-link {
		font-weight: 600;
		font-size: 15px;
		color: var(--accent);
	}
	/* Picto à gauche, texte à droite, le tout centré verticalement dans la carte. */
	.placeholder {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-content: center;
		align-items: start;
		gap: 18px;
		min-height: 260px;
		padding: 28px;
		border: 1.5px dashed var(--line);
		border-radius: 16px;
		color: var(--muted);
	}
	.txt {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.placeholder h3 {
		margin: 0;
		font-size: 19px;
		font-weight: 600;
		color: var(--ink);
	}
	.placeholder p {
		margin: 0;
		line-height: 1.55;
		font-size: 15px;
	}

	.why {
		display: flex;
		flex-wrap: wrap;
		gap: 48px 80px;
		padding-block: clamp(72px, 9vw, 96px) clamp(80px, 10vw, 112px);
		scroll-margin-top: 16px;
	}
	.why-head {
		flex: 1 1 320px;
		min-width: 0;
	}
	.why-text {
		flex: 2 1 520px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
		font-size: 18px;
		line-height: 1.7;
		color: var(--muted);
	}
	.why-text p {
		margin: 0;
	}
	.why-item {
		display: flex;
		align-items: flex-start;
		gap: 18px;
	}
	.disclaimer {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 20px 24px;
		border-radius: 12px;
		background: var(--surface);
		border: 1px solid var(--line);
		font-size: 16px;
		line-height: 1.6;
	}
</style>

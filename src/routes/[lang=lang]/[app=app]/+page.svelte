<script lang="ts">
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import { apps } from '$lib/apps';
	import { screenshotSrcset, screenshotUrl } from '$lib/apps/types';
	import { icons } from '$lib/icons';
	import { formatDate, localize, t } from '$lib/i18n';
	import AppIcon from '$lib/components/AppIcon.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import DownloadCard from '$lib/components/DownloadCard.svelte';
	import InstallTabs from '$lib/components/InstallTabs.svelte';
	import Picto from '$lib/components/Picto.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { appJsonLd } from '$lib/structured-data';

	let { data } = $props();
	const lang = $derived(data.lang);
	const d = $derived(t(lang));
	const app = $derived(apps[data.slug]);
	const c = $derived(app.content[lang]);
	const repoUrl = $derived(`https://github.com/${app.repo}`);
	const screenshots = $derived(
		app.screenshots.map((s, i) => ({
			src: screenshotUrl(app.slug, lang, s.name, 1280),
			srcset: screenshotSrcset(app.slug, lang, s.name),
			width: s.width,
			height: s.height,
			alt: c.screenshotAlt[i] ?? app.name
		}))
	);
</script>

<Seo
	title="{app.name} — {c.tagline}"
	description="{c.tagline} {c.summary}"
	{lang}
	image="/og/{app.slug}-{lang}.png"
	imageAlt="{app.name} — {c.tagline}"
	jsonLd={appJsonLd(app, data.release, lang)}
/>

<section class="container hero">
	<nav class="crumbs" aria-label={d.app.breadcrumb}>
		<ol>
			<li><a href={localize(lang, '/#applications')}>{d.nav.apps}</a></li>
			<li aria-current="page">{app.name}</li>
		</ol>
	</nav>

	<div class="hero-row">
		<div class="hero-text">
			<div class="title">
				<AppIcon name={app.name} src={app.icon} size="lg" />
				<div>
					<h1><span class={app.nameClass}>{app.name}</span></h1>
					{#if data.release.version}
						<p class="version">
							{d.app.version}
							{data.release.version}{#if data.release.date}&nbsp;· {d.app.publishedOn} {formatDate(lang, data.release.date)}{/if}
						</p>
					{/if}
				</div>
			</div>
			<p class="tagline">{c.tagline}</p>
			<p class="lead summary">{c.summary}</p>
			<ul class="badges" aria-label={d.app.inBrief}>
				{#each c.badges as badge, i (badge.label)}
					{@const Icon = icons[badge.icon]}
					<li class:accent={i === 0}><Icon size={15} strokeWidth={1.8} aria-hidden="true" />{badge.label}</li>
				{/each}
			</ul>
		</div>
		<div class="hero-download">
			<DownloadCard {app} release={data.release} {lang} />
		</div>
	</div>
</section>

{#if screenshots.length > 0}
	<div class="container shots">
		<Carousel images={screenshots} label="{d.app.screenshotsLabel} — {app.name}" {lang} />
	</div>
{/if}

<section class="band">
	<div class="container block">
		<p class="eyebrow">{d.app.featuresEyebrow}</p>
		<h2 class="section-title narrow">{c.featuresTitle}</h2>
		<div class="features">
			{#each c.features as feature (feature.title)}
				<div class="feature">
					<Picto icon={feature.icon} tint={feature.tint} />
					<div class="txt">
						<h3>{feature.title}</h3>
						<p>{feature.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="container block">
	<p class="eyebrow">{d.app.securityEyebrow}</p>
	<h2 class="section-title">{c.security.title}</h2>
	<p class="lead security-intro">{c.security.intro}</p>

	<figure class="card chain">
		<ol>
			{#each c.security.chain as step, i (step.label)}
				{@const Icon = icons[step.icon]}
				<li class:highlight={step.highlight}>
					<span class="step-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
					<span class="step-label">{step.label}</span>
					{#if step.detail}<span class="step-detail">{step.detail}</span>{/if}
				</li>
				{#if i < c.security.chain.length - 1}
					<li class="arrow" aria-hidden="true">→</li>
				{/if}
			{/each}
		</ol>
		<figcaption>{c.security.chainCaption}</figcaption>
	</figure>

	<div class="points">
		{#each c.security.points as point (point.title)}
			<div class="point">
				<Picto icon={point.icon} tint={point.tint} />
				<div class="txt">
					<h3>{point.title}</h3>
					<p>{point.text}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="note-warn warning" role="note">
		<TriangleAlert size={22} />
		<p>
			<RichText text={c.security.warning} />
			{#if c.security.resetLink && c.security.resetHref}
				<a class="reset" href={c.security.resetHref}>{c.security.resetLink} ↗</a>
			{/if}
		</p>
	</div>
	<p class="security-links">
		<a href="{repoUrl}/blob/main/docs/securite.md">{c.security.modelLink} ↗</a>
		<a href="{repoUrl}/blob/main/SECURITY.md">{c.security.reportLink} ↗</a>
	</p>
</section>

<section id="installer" class="band">
	<div class="container block">
		<p class="eyebrow">{d.app.installEyebrow}</p>
		<h2 class="section-title install-title">{d.app.installTitle}</h2>
		<InstallTabs install={c.install} {lang} idPrefix={app.slug} />
	</div>
</section>

<section class="container closing">
	<div class="card closing-card">
		<h2><Picto icon="eye-off" tint="sky" />{d.app.privacy}</h2>
		<p>{c.privacy}</p>
	</div>
	<div class="card closing-card">
		<h2><Picto icon="scale" tint="lilac" />{d.app.license}</h2>
		<p>{c.license}</p>
		<p><a href={repoUrl}>{d.app.sourceCode} ↗</a></p>
	</div>
</section>

<style>
	.hero {
		padding-block: 40px 64px;
	}
	.crumbs ol {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0 0 40px;
		padding: 0;
		list-style: none;
		font-size: 14px;
		color: var(--subtle);
	}
	.crumbs li + li::before {
		content: '/';
		margin-right: 8px;
	}
	.crumbs a {
		color: var(--muted);
	}
	.hero-row {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		gap: 48px;
	}
	.hero-text {
		flex: 1 1 520px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.hero-download {
		flex: 0 1 400px;
		min-width: 0;
	}
	.title {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.4rem, 4.5vw, 3.6rem);
		line-height: 1;
		letter-spacing: -0.03em;
	}
	.version {
		margin: 8px 0 0;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--subtle);
	}
	.tagline {
		margin: 0;
		font-size: 22px;
		line-height: 1.45;
		font-weight: 500;
		max-width: 620px;
	}
	.summary {
		margin: 0;
		max-width: 600px;
	}
	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.badges li {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 6px 12px;
		border-radius: 999px;
		background: var(--chip);
		font-size: 13px;
		font-weight: 500;
	}
	.badges li.accent {
		background: var(--accent-soft);
		color: var(--accent-ink);
		font-weight: 600;
	}

	.shots {
		padding-bottom: 96px;
	}

	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	.block {
		padding-block: clamp(64px, 9vw, 96px);
	}
	.narrow {
		max-width: 760px;
		margin-bottom: 48px;
	}
	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 40px 48px;
	}
	/* Picto à gauche, titre et texte à droite. */
	.feature,
	.point {
		display: flex;
		align-items: flex-start;
		gap: 16px;
	}
	.txt {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}
	.feature h3,
	.points h3 {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
	}
	.feature p,
	.points p {
		margin: 0;
		color: var(--muted);
		line-height: 1.6;
		font-size: 15px;
	}

	.security-intro {
		margin: 16px 0 40px;
		max-width: 720px;
	}
	.chain {
		margin: 0 0 48px;
		padding: 28px;
	}
	.chain ol {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.chain li:not(.arrow) {
		flex: 1 1 160px;
		padding: 16px;
		border-radius: 12px;
		border: 1px solid var(--line);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}
	.step-icon {
		display: flex;
		margin-bottom: 4px;
		opacity: 0.85;
	}
	.chain li.highlight {
		background: var(--accent-soft);
		border-color: transparent;
		color: var(--accent-ink);
	}
	.step-label {
		font-weight: 600;
	}
	.step-detail {
		font-size: 13px;
	}
	.arrow {
		color: var(--subtle);
		font-size: 20px;
	}
	.chain figcaption {
		margin-top: 16px;
		font-size: 14px;
		color: var(--subtle);
	}
	.points {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		gap: 32px 40px;
	}
	.warning {
		margin-top: 40px;
		font-size: 15px;
	}
	.warning :global(svg) {
		flex: none;
		margin-top: 1px;
	}
	.reset {
		display: inline-block;
		margin-top: 6px;
		color: inherit;
		font-weight: 600;
	}
	.security-links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 24px;
		margin: 20px 0 0;
		font-size: 15px;
	}

	.install-title {
		margin-bottom: 32px;
	}

	.closing {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 24px;
		padding-block: 80px 104px;
	}
	.closing-card {
		padding: 28px;
	}
	.closing-card h2 {
		display: flex;
		align-items: center;
		gap: 14px;
		margin: 0 0 14px;
		font-size: 18px;
		font-weight: 600;
	}
	.closing-card p {
		margin: 0;
		color: var(--muted);
		line-height: 1.6;
		font-size: 15px;
	}
	.closing-card p + p {
		margin-top: 14px;
	}
</style>

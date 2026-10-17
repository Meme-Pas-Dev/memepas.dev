<script lang="ts">
	import { site } from '$lib/config';
	import { formatDate, t } from '$lib/i18n';
	import Seo from '$lib/components/Seo.svelte';

	let { data } = $props();
	const lang = $derived(data.lang);
	const d = $derived(t(lang));
	const s = $derived(d.legal.sections);
	// Ancres identiques dans les deux langues (liens du pied de page).
	const toc = $derived([
		{ id: 'mentions', label: s.mentions },
		{ id: 'confidentialite', label: s.privacy },
		{ id: 'cookies', label: s.cookies },
		{ id: 'accessibilite', label: s.accessibility },
		{ id: 'credits', label: s.credits }
	]);
</script>

<Seo title="{d.meta.legalTitle} — Meme-Pas-Dev" description={d.meta.legalDescription} {lang} />

<div class="container page">
	<h1>{d.legal.title}</h1>
	<p class="updated">{d.legal.updated} {formatDate(lang, site.legalUpdated)}</p>

	<div class="layout">
		<nav class="toc" aria-label={d.legal.toc}>
			<ul>
				{#each toc as item (item.id)}
					<li><a href="#{item.id}">{item.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="content">
			<section id="mentions" class="card">
				<h2>{s.mentions}</h2>
				<dl>
					<dt>{d.legal.publisherLabel}</dt>
					<dd>{d.legal.publisher}</dd>
					<dt>{d.legal.contactLabel}</dt>
					<dd><a href="mailto:{site.contactEmail}">{site.contactEmail}</a></dd>
					<dt>{d.legal.hostLabel}</dt>
					<dd>{site.host.name} — {site.host.address}</dd>
					<dt>{d.legal.sourceLabel}</dt>
					<dd><a href={site.repository}>{site.repository.replace('https://', '')}</a></dd>
				</dl>
			</section>

			<section id="confidentialite" class="card">
				<h2>{d.legal.privacyTitle}</h2>
				<p class="summary">{d.legal.privacySummary}</p>
				{#each d.legal.privacy as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section id="cookies" class="card">
				<h2>{s.cookies}</h2>
				<p>{d.legal.cookiesText}</p>
			</section>

			<section id="accessibilite" class="card">
				<h2>{s.accessibility}</h2>
				<p>{d.legal.accessibilityText} <a href="mailto:{site.contactEmail}">{d.legal.accessibilityLink}</a>.</p>
			</section>

			<section id="credits" class="card">
				<h2>{s.credits}</h2>
				<ul>
					{#each d.legal.credits as credit (credit)}
						<li>{credit}</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
</div>

<style>
	.page {
		padding-block: clamp(48px, 8vw, 72px) clamp(80px, 10vw, 120px);
	}
	h1 {
		margin: 0 0 12px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.4rem, 4.5vw, 3.4rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
	}
	.updated {
		margin: 0 0 56px;
		color: var(--subtle);
		font-size: 15px;
	}
	.layout {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 48px;
	}
	.toc {
		flex: 1 1 220px;
	}
	.toc ul {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 15px;
	}
	.toc a {
		display: block;
		padding: 10px 14px;
		border-radius: 8px;
		color: var(--muted);
		text-decoration: none;
	}
	.toc a:hover {
		background: var(--chip);
		color: var(--ink);
	}
	.content {
		flex: 999 1 560px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 24px;
		line-height: 1.7;
		color: var(--muted);
	}
	section {
		padding: clamp(20px, 4vw, 32px);
		scroll-margin-top: 16px;
	}
	section p {
		margin: 0;
	}
	section p + p {
		margin-top: 14px;
	}
	h2 {
		margin: 0 0 18px;
		font-family: var(--font-display);
		font-size: 26px;
		color: var(--ink);
	}
	dl {
		margin: 0;
		display: grid;
		grid-template-columns: minmax(120px, auto) 1fr;
		gap: 12px 24px;
	}
	dt {
		font-weight: 600;
		color: var(--ink);
	}
	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}
	@media (max-width: 560px) {
		dl {
			grid-template-columns: 1fr;
			gap: 4px;
		}
		dd + dt {
			margin-top: 12px;
		}
	}
	.summary {
		padding: 16px 20px;
		border-radius: 12px;
		background: var(--accent-soft);
		color: var(--accent-ink);
		font-weight: 500;
	}
	ul {
		margin: 0;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
</style>

<script lang="ts">
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import { localize, t, type Lang } from '$lib/i18n';
	import { site } from '$lib/config';
	import Logo from './Logo.svelte';
	import Wordmark from './Wordmark.svelte';

	let { lang }: { lang: Lang } = $props();
	const d = $derived(t(lang));
</script>

<footer class="footer">
	<div class="container inner">
		<div class="top">
			<div class="about">
				<span class="name"><Logo size={28} /><Wordmark onDark /></span>
				<p>{d.footer.tagline}</p>
			</div>
			<nav aria-label={d.footer.links}>
				<ul>
					<li><a href={localize(lang, '/downloads/')}>{d.nav.downloads}</a></li>
					<li><a href={site.github}>{d.footer.github}</a></li>
					<li><a href={localize(lang, '/legal/')}>{d.footer.legal}</a></li>
					<li><a href={localize(lang, '/legal/#confidentialite')}>{d.footer.privacy}</a></li>
					<li><a href={localize(lang, '/legal/#accessibilite')}>{d.footer.accessibility}</a></li>
				</ul>
			</nav>
		</div>
		<div class="bottom">
			<p class="promise">
				<ShieldCheck size={18} color="#5CC9AE" />
				{d.footer.noTracking}
			</p>
			<p>© {new Date().getFullYear()} Meme-Pas-Dev</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--footer);
		color: #c9ccd3;
	}
	.inner {
		display: flex;
		flex-direction: column;
		gap: 40px;
		padding-block: 56px 40px;
	}
	.top {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 32px;
	}
	.about {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 360px;
	}
	.about p {
		margin: 0;
		font-size: 15px;
		line-height: 1.55;
	}
	.name {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 19px;
		color: #ffffff;
		--logo-bg: var(--footer-logo);
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 28px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 15px;
	}
	ul a {
		display: inline-block;
		padding: 10px 0;
		color: #ffffff;
	}
	ul a:hover {
		color: #5cc9ae;
	}
	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 24px;
		border-top: 1px solid var(--footer-line);
		font-size: 14px;
	}
	.bottom p {
		margin: 0;
	}
	.promise {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #ffffff;
	}
	.promise :global(svg) {
		flex: none;
	}
</style>

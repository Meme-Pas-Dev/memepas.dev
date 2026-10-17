<script lang="ts">
	import { onMount } from 'svelte';
	import Download from '@lucide/svelte/icons/download';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import { apps, type Platform } from '$lib/apps';
	import { formatDate, formatSize, localize, t } from '$lib/i18n';
	import AppIcon from '$lib/components/AppIcon.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Picto from '$lib/components/Picto.svelte';
	import { icons, platformPicto } from '$lib/icons';
	import Seo from '$lib/components/Seo.svelte';

	let { data } = $props();
	const lang = $derived(data.lang);
	const d = $derived(t(lang));

	// Le filtre n'apparaît qu'avec JavaScript ; sans lui, tout est affiché.
	let enhanced = $state(false);
	let filter = $state<Platform | 'all'>('all');
	onMount(() => (enhanced = true));

	const filters = $derived([
		{ id: 'all' as const, label: d.downloads.all, icon: null },
		{ id: 'linux' as const, label: d.os.linux, icon: icons[platformPicto.linux.icon] },
		{ id: 'macos' as const, label: d.os.macos, icon: icons[platformPicto.macos.icon] },
		{ id: 'windows' as const, label: d.os.windows, icon: icons[platformPicto.windows.icon] }
	]);
	const visible = (platform: Platform) => filter === 'all' || filter === platform;
</script>

<Seo title="{d.meta.downloadsTitle} — Meme-Pas-Dev" description={d.meta.downloadsDescription} {lang} />

<div class="container page">
	<div class="head">
		<div class="intro">
			<h1>{d.downloads.title}</h1>
			<p class="lead">{d.downloads.intro}</p>
		</div>
		{#if enhanced}
			<div class="filters" role="group" aria-label={d.downloads.filterLabel}>
				{#each filters as f (f.id)}
					<button type="button" aria-pressed={filter === f.id} onclick={() => (filter = f.id)}>
						{#if f.icon}<f.icon size={16} strokeWidth={1.8} aria-hidden="true" />{/if}{f.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	{#each data.releases as { slug, release } (slug)}
		{@const app = apps[slug]}
		{@const c = app.content[lang]}
		<section class="card app" aria-labelledby="app-{slug}">
			<div class="app-head">
				<AppIcon name={app.name} src={app.icon} />
				<div class="app-title">
					<h2 id="app-{slug}"><a class={app.nameClass} href={localize(lang, `/${slug}/`)}>{app.name}</a></h2>
					<p>
						{#if release.version}
							{d.downloads.versionOf} <span class="mono">{release.version}</span>{#if release.date}&nbsp;{d.downloads.of} {formatDate(lang, release.date)}{/if}
						{:else}
							{c.platforms}
						{/if}
					</p>
				</div>
				<div class="app-links">
					<a href={release.notesUrl}>{d.downloads.releaseNotes} ↗</a>
					<a href={release.allUrl}>{d.downloads.previousVersions} ↗</a>
				</div>
			</div>

			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th scope="col">{d.downloads.system}</th>
							<th scope="col">{d.downloads.file}</th>
							<th scope="col">{d.downloads.verification}</th>
							<th scope="col" class="right"><span class="visually-hidden">{d.downloads.download}</span></th>
						</tr>
					</thead>
					<tbody>
						{#each release.files as file (file.id)}
							{@const picto = app.files.find((spec) => spec.id === file.id)?.picto}
							{#if visible(file.platform)}
								<tr>
									<th scope="row">
										<span class="system">
											{#if picto}<Picto icon={picto.icon} tint={picto.tint} />{/if}
											<span>
												<span class="os">{c.files[file.id]?.label ?? file.platform}</span>
												<span class="note">{c.files[file.id]?.note}</span>
											</span>
										</span>
									</th>
									<td class="mono small">
										{file.name}
										{#if file.size}<span class="size">{formatSize(lang, file.size)}</span>{/if}
									</td>
									<td class="small">
										{#if file.checksums.length > 0}
											<ul class="sums">
												{#each file.checksums as sum (sum.name)}
													<li><a class="mono" href={sum.url}>{sum.name}</a></li>
												{/each}
											</ul>
										{:else}
											{d.downloads.appleSignature}
										{/if}
									</td>
									<td class="right">
										<a class="btn btn-primary dl" href={file.url}>
											<Download size={16} />
											{d.downloads.download}<span class="visually-hidden">&nbsp;{file.name}</span>
										</a>
									</td>
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
			</div>

			{#if app.copr && visible('linux')}
				<div class="copr">
					<p><RefreshCw size={18} strokeWidth={1.8} aria-hidden="true" />{d.downloads.coprHint}</p>
					<CodeBlock
						code="sudo dnf copr enable {app.copr}{'\n'}sudo dnf install {slug}"
						copyLabel={d.app.copyCommands}
						copiedLabel={d.app.copied}
					/>
				</div>
			{/if}
		</section>
	{/each}

	<section class="help">
		<div>
			<Picto icon="file-check" tint="mint" />
			<div class="txt">
				<h2>{d.downloads.verifyTitle}</h2>
				<p>{d.downloads.verifyText}</p>
				<p>
					<a href="https://github.com/Meme-Pas-Dev/Quayline/blob/main/packaging/signing-key.asc">{d.downloads.publicKey} ↗</a>
					·
					<a href={localize(lang, '/quayline/#installer')}>{d.downloads.howTo}</a>
				</p>
			</div>
		</div>
		<div>
			<Picto icon="triangle-alert" tint="sand" />
			<div class="txt">
				<h2>{d.downloads.smartscreenTitle}</h2>
				<p>{d.downloads.smartscreenText}</p>
			</div>
		</div>
		<div>
			<Picto icon="folder-git" tint="lilac" />
			<div class="txt">
				<h2>{d.downloads.githubTitle}</h2>
				<p>{d.downloads.githubText}</p>
			</div>
		</div>
	</section>
</div>

<style>
	.page {
		padding-block: clamp(48px, 8vw, 72px) clamp(80px, 10vw, 120px);
	}
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		margin-bottom: 40px;
	}
	.intro {
		max-width: 660px;
	}
	h1 {
		margin: 0 0 16px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.4rem, 4.5vw, 3.6rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
	}
	.intro .lead {
		margin: 0;
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 4px;
		border-radius: 12px;
		background: var(--chip);
	}
	.filters button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 40px;
		padding: 0 16px;
		border-radius: 9px;
		border: none;
		background: transparent;
		color: var(--muted);
		font: inherit;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}
	/* Sur les plus petits écrans, le filtre tient sur une ligne sans ses icônes. */
	@media (max-width: 420px) {
		.filters button :global(svg) {
			display: none;
		}
	}
	.filters button[aria-pressed='true'] {
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
	}

	.app {
		overflow: hidden;
	}
	.app + .app {
		margin-top: 24px;
	}
	.app-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px;
		padding: 24px;
		border-bottom: 1px solid var(--line-soft);
	}
	.app-title {
		flex: 1 1 240px;
	}
	.app-title h2 {
		margin: 0;
		font-size: 20px;
		font-weight: 600;
	}
	.app-title h2 a {
		color: var(--ink);
		text-decoration: none;
	}
	.app-title p {
		margin: 2px 0 0;
		font-size: 14px;
		color: var(--subtle);
	}
	.app-links {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 20px;
		font-size: 15px;
		font-weight: 600;
	}
	.app-links a {
		padding: 10px 0;
	}

	.table-wrap {
		position: relative;
		overflow-x: auto;
	}
	table {
		width: 100%;
		min-width: 820px;
		border-collapse: collapse;
		font-size: 15px;
	}
	thead th {
		text-align: left;
		color: var(--subtle);
		font-size: 13px;
		font-weight: 500;
		padding: 14px 12px;
	}
	th,
	td {
		padding: 18px 12px;
		vertical-align: middle;
		text-align: left;
	}
	th:first-child,
	td:first-child {
		padding-left: 24px;
	}
	th:last-child,
	td:last-child {
		padding-right: 24px;
	}
	tbody tr {
		border-top: 1px solid var(--line-soft);
	}
	.system {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.os {
		display: block;
		font-weight: 600;
	}
	.note {
		display: block;
		font-weight: 400;
		font-size: 13px;
		color: var(--subtle);
	}
	.mono {
		font-family: var(--font-mono);
	}
	.small {
		font-size: 13px;
		color: var(--muted);
	}
	.size {
		display: block;
		color: var(--subtle);
	}
	.sums {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.right {
		text-align: right;
	}
	.dl {
		min-height: 44px;
		padding: 0 16px;
		font-size: 14px;
		white-space: nowrap;
	}
	/* Sur petit écran, chaque fichier devient une fiche. */
	@media (max-width: 760px) {
		table {
			min-width: 0;
		}
		thead {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
		}
		tbody tr {
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 20px 24px;
		}
		tbody th,
		tbody td,
		tbody th:first-child,
		tbody td:first-child,
		tbody td:last-child {
			display: block;
			padding: 0;
			text-align: left;
		}
		.dl {
			width: 100%;
		}
	}
	.copr {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 20px 24px 24px;
		border-top: 1px solid var(--line-soft);
		background: var(--accent-soft);
	}
	.copr p {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		font-weight: 600;
		font-size: 15px;
		color: var(--accent-ink);
	}

	.help {
		margin-top: 32px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 16px;
	}
	/* Picto à gauche, titre et texte à droite. */
	.help > div {
		padding: 24px;
		border-radius: 16px;
		background: var(--chip);
		display: flex;
		align-items: flex-start;
		gap: 16px;
	}
	.help .txt {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-width: 0;
	}
	.help h2 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
	}
	.help p {
		margin: 0;
		font-size: 15px;
		line-height: 1.55;
		color: var(--muted);
	}
</style>

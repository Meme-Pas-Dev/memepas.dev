<script lang="ts">
	import { onMount } from 'svelte';
	import Download from '@lucide/svelte/icons/download';
	import Monitor from '@lucide/svelte/icons/monitor';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import type { AppDefinition, Platform, ResolvedRelease } from '$lib/apps';
	import { formatDate, formatSize, localize, t, type Lang } from '$lib/i18n';
	import { icons, platformPicto } from '$lib/icons';
	import { detectPlatform } from '$lib/os';
	import CodeBlock from './CodeBlock.svelte';
	import Picto from './Picto.svelte';

	let { app, release, lang }: { app: AppDefinition; release: ResolvedRelease; lang: Lang } = $props();

	const d = $derived(t(lang));
	const content = $derived(app.content[lang]);

	// Rendu sans système détecté (page statique, ou navigateur sans JavaScript) :
	// toutes les plateformes sont proposées.
	let platform = $state<Platform | null>(null);
	onMount(() => {
		platform = detectPlatform();
	});

	const osName: Record<Platform, string> = $derived({
		linux: app.copr ? 'Linux (Fedora)' : d.os.linux,
		macos: d.os.macos,
		windows: d.os.windows
	});
	const filesFor = (p: Platform) => release.files.filter((f) => f.platform === p);
	const pictoOf = (id: string) => app.files.find((spec) => spec.id === id)?.picto;
	const platforms = $derived([...new Set(release.files.map((f) => f.platform))]);
	const coprCommands = $derived(app.copr ? `sudo dnf copr enable ${app.copr}\nsudo dnf install ${app.slug}` : '');
	const sizeOf = (bytes: number | null) => (bytes ? ` · ${formatSize(lang, bytes)}` : '');
</script>

<div class="card download">
	<div class="meta">
		<span class="detected">
			<Monitor size={16} />
			{#if platform}
				{d.app.forYourSystem} : {osName[platform]}
			{:else}
				{d.app.chooseSystem}
			{/if}
		</span>
		{#if release.version}
			<span class="version" title={release.date ? `${d.app.publishedOn} ${formatDate(lang, release.date)}` : undefined}>v{release.version}</span>
		{/if}
	</div>

	{#if platform === 'linux' && app.copr}
		<div class="stack">
			<p class="strong">{d.app.recommendedCopr}</p>
			<CodeBlock code={coprCommands} copyLabel={d.app.copyCommands} copiedLabel={d.app.copied} wrap />
			<p class="small">{d.app.coprNote} <code class="inline-code">dnf upgrade</code>.</p>
			<div class="alt">
				{#each filesFor('linux') as file (file.id)}
					{@const picto = pictoOf(file.id)}
					{@const Icon = picto ? icons[picto.icon] : null}
					<a class="btn btn-secondary" href={file.url}>
						{#if Icon && picto}<span class="tint-{picto.tint} file-icon"><Icon size={16} strokeWidth={1.8} aria-hidden="true" /></span>{/if}
						{content.files[file.id]?.label ?? file.name}
					</a>
				{/each}
			</div>
			<p class="small">{d.app.manualNote}</p>
		</div>
	{:else if platform}
		{#each filesFor(platform).slice(0, 1) as file (file.id)}
			<div class="stack">
				<a class="btn btn-accent big" href={file.url}>
					<Download size={20} />
					{d.app.downloadFor} {content.files[file.id]?.label ?? osName[platform]}
				</a>
				<p class="file">{file.name}{sizeOf(file.size)}</p>
				<p class="small center">{content.files[file.id]?.note}</p>
				{#if platform === 'windows'}
					<div class="note-warn small-warn">
						<TriangleAlert size={18} />
						<p>{content.smartscreen}</p>
					</div>
				{/if}
			</div>
		{/each}
	{:else}
		<ul class="choices">
			{#each platforms as p (p)}
				{@const first = filesFor(p)[0]}
				<li>
					<a class="btn btn-secondary choice" href={p === 'linux' && app.copr ? '#installer' : first.url}>
						<Picto icon={platformPicto[p].icon} tint={platformPicto[p].tint} size="sm" />
						<span>{p === 'linux' ? osName.linux : (content.files[first.id]?.label ?? osName[p])}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="links">
		<a href={localize(lang, '/downloads/')}>{d.app.otherSystems}</a>
		<a href={release.notesUrl}>{d.app.releaseNotes} ↗</a>
	</div>
</div>

<style>
	.download {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		font-size: 13px;
		color: var(--subtle);
	}
	.detected {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.version {
		font-family: var(--font-mono);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.stack p {
		margin: 0;
	}
	.strong {
		font-weight: 600;
		font-size: 15px;
	}
	.small {
		font-size: 13px;
		color: var(--subtle);
		line-height: 1.5;
	}
	.center {
		text-align: center;
	}
	.big {
		min-height: 56px;
		border-radius: 12px;
		font-size: 17px;
	}
	.file {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
		text-align: center;
		overflow-wrap: anywhere;
	}
	.alt {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 8px;
	}
	.alt .btn {
		min-height: 44px;
		font-size: 14px;
		padding: 0 12px;
	}
	.small-warn {
		font-size: 13px;
		padding: 12px 14px;
	}
	.small-warn :global(svg) {
		flex: none;
		margin-top: 1px;
	}
	.choices {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.choice {
		width: 100%;
		justify-content: flex-start;
		padding-left: 8px;
	}
	.file-icon {
		display: flex;
		color: var(--tint-fg);
	}
	.links {
		border-top: 1px solid var(--line-soft);
		padding-top: 14px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px 16px;
		font-size: 14px;
	}
</style>

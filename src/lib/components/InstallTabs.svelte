<script lang="ts">
	import { onMount } from 'svelte';
	import type { AppContent, Platform } from '$lib/apps/types';
	import { t, type Lang } from '$lib/i18n';
	import { icons } from '$lib/icons';
	import { detectPlatform } from '$lib/os';
	import CodeBlock from './CodeBlock.svelte';
	import RichText from './RichText.svelte';

	let {
		install,
		lang,
		idPrefix,
		unavailable = []
	}: {
		install: AppContent['install'];
		lang: Lang;
		idPrefix: string;
		/** Fichiers pas encore publiés : leurs onglets portent la mention « Bientôt disponible ». */
		unavailable?: string[];
	} = $props();
	const d = $derived(t(lang));

	// Sans JavaScript, toutes les sections s'affichent l'une sous l'autre.
	let enhanced = $state(false);
	let selected = $state('');
	const tabRefs: HTMLButtonElement[] = [];

	onMount(() => {
		const platform: Platform | null = detectPlatform();
		selected = install.find((tab) => tab.platform === platform)?.id ?? install[0].id;
		enhanced = true;
	});

	function onKeydown(event: KeyboardEvent, index: number) {
		let next = index;
		if (event.key === 'ArrowRight') next = (index + 1) % install.length;
		else if (event.key === 'ArrowLeft') next = (index - 1 + install.length) % install.length;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = install.length - 1;
		else return;
		event.preventDefault();
		selected = install[next].id;
		tabRefs[next]?.focus();
	}
</script>

{#if enhanced}
	<div class="tablist" role="tablist" aria-label={d.app.systemTabs}>
		{#each install as tab, i (tab.id)}
			{@const Icon = icons[tab.icon]}
			<button
				bind:this={tabRefs[i]}
				type="button"
				role="tab"
				id="{idPrefix}-tab-{tab.id}"
				aria-controls="{idPrefix}-panel-{tab.id}"
				aria-selected={selected === tab.id}
				tabindex={selected === tab.id ? 0 : -1}
				onclick={() => (selected = tab.id)}
				onkeydown={(event) => onKeydown(event, i)}><Icon size={16} strokeWidth={1.8} aria-hidden="true" />{tab.label}</button
			>
		{/each}
	</div>
{/if}

{#each install as tab (tab.id)}
	<section
		class="panel"
		id="{idPrefix}-panel-{tab.id}"
		role={enhanced ? 'tabpanel' : undefined}
		aria-labelledby={enhanced ? `${idPrefix}-tab-${tab.id}` : undefined}
		hidden={enhanced && selected !== tab.id}
	>
		{#if !enhanced}
			<h3>{tab.label}</h3>
		{/if}
		{#if tab.fileId && unavailable.includes(tab.fileId)}
			<p class="soon" role="note">{d.app.comingSoonInstall}</p>
		{/if}
		{#each tab.blocks as block, i (i)}
			{#if block.type === 'code'}
				<CodeBlock code={block.code} copyLabel={d.app.copy} copiedLabel={d.app.copied} />
			{:else}
				<p><RichText text={block.text} /></p>
			{/if}
		{/each}
	</section>
{/each}

<style>
	.tablist {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 4px;
		border-radius: 12px;
		background: var(--chip);
		width: fit-content;
		max-width: 100%;
		margin-bottom: 24px;
	}
	[role='tab'] {
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
	[role='tab'][aria-selected='true'] {
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
	}
	.panel {
		max-width: 820px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		color: var(--muted);
		line-height: 1.65;
	}
	.panel[hidden] {
		display: none;
	}
	.panel + .panel {
		margin-top: 32px;
	}
	[role='tabpanel'] + [role='tabpanel'] {
		margin-top: 0;
	}
	.panel .soon {
		padding: 14px 18px;
		border-radius: 12px;
		border: 1px dashed var(--line);
		background: var(--surface);
		color: var(--ink);
		font-weight: 500;
	}
	.panel p {
		margin: 0;
	}
	h3 {
		margin: 0;
		color: var(--ink);
		font-size: 20px;
	}
</style>

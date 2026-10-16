<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let {
		code,
		copyLabel,
		copiedLabel,
		wrap = false
	}: {
		code: string;
		copyLabel: string;
		copiedLabel: string;
		/** Replie les lignes longues au lieu de faire défiler (blocs étroits, comme la carte de téléchargement). */
		wrap?: boolean;
	} = $props();
</script>

<div class="code-block">
	{#if wrap}
		<!-- Repli uniquement aux espaces, suite de ligne en retrait ; le texte copié est inchangé. -->
		<pre class="wrap"><code
				>{#each code.split('\n') as line, i (i)}<span class="line"
						>{#each line.split(' ') as word, j (j)}{#if j > 0}{' '}{/if}<span class="word">{word}</span
							>{/each}</span
					>{/each}</code
			></pre>
	{:else}
		<pre><code>{code}</code></pre>
	{/if}
	<div class="actions">
		<CopyButton value={code} label={copyLabel} {copiedLabel} />
	</div>
</div>

<style>
	.code-block {
		display: flex;
		align-items: flex-start;
		min-width: 0;
		max-width: 100%;
		border-radius: 12px;
		background: var(--code);
		color: var(--code-ink);
	}
	pre {
		flex: 1;
		min-width: 0;
		margin: 0;
		padding: 16px 12px 16px 18px;
		overflow-x: auto;
		font-size: 14px;
		line-height: 1.7;
	}
	pre.wrap {
		white-space: pre-wrap;
		font-size: 13px;
	}
	.line {
		display: block;
		padding-left: 2ch;
		text-indent: -2ch;
	}
	.word {
		white-space: nowrap;
	}
	.actions {
		flex: none;
		padding: 6px 6px 0 0;
	}
</style>

<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	let {
		value,
		label,
		copiedLabel,
		variant = 'dark'
	}: { value: string; label: string; copiedLabel: string; variant?: 'dark' | 'light' } = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 2000);
		} catch {
			copied = false;
		}
	}
</script>

<button type="button" class="copy {variant}" onclick={copy} aria-label={copied ? copiedLabel : label} title={label}>
	{#if copied}
		<Check size={16} />
	{:else}
		<Copy size={16} />
	{/if}
</button>
<span class="visually-hidden" aria-live="polite">{copied ? copiedLabel : ''}</span>

<style>
	.copy {
		width: 40px;
		height: 40px;
		flex: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		border: none;
		cursor: pointer;
	}
	.dark {
		background: rgb(255 255 255 / 0.1);
		color: #e6e8eb;
	}
	.dark:hover {
		background: rgb(255 255 255 / 0.18);
	}
	.light {
		background: var(--chip);
		color: var(--ink);
	}
</style>

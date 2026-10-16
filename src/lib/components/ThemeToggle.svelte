<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { onMount } from 'svelte';

	let { toDark, toLight }: { toDark: string; toLight: string } = $props();

	let dark = $state(false);
	let ready = $state(false);

	function effectiveDark(): boolean {
		const chosen = document.documentElement.dataset.theme;
		if (chosen === 'dark') return true;
		if (chosen === 'light') return false;
		return matchMedia('(prefers-color-scheme: dark)').matches;
	}

	onMount(() => {
		dark = effectiveDark();
		ready = true;
		const media = matchMedia('(prefers-color-scheme: dark)');
		const update = () => (dark = effectiveDark());
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// Stockage indisponible (navigation privée) : le choix vaut pour cette page seulement.
		}
	}
</script>

<!-- Sans JavaScript, le thème suit simplement le système : le bouton n'apparaît pas. -->
{#if ready}
	<button type="button" class="toggle" onclick={toggle} aria-label={dark ? toLight : toDark} title={dark ? toLight : toDark}>
		{#if dark}
			<Sun size={20} strokeWidth={1.8} />
		{:else}
			<Moon size={20} strokeWidth={1.8} />
		{/if}
	</button>
{/if}

<style>
	.toggle {
		width: 44px;
		height: 44px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		border: none;
		background: transparent;
		color: var(--ink);
		cursor: pointer;
	}
	.toggle:hover {
		background: var(--chip);
	}
</style>

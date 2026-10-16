<script lang="ts">
	// Icône de l'application si elle existe, sinon l'initiale de son nom.
	let { name, src, size = 'md' }: { name: string; src?: string; size?: 'sm' | 'md' | 'lg' } = $props();
	const px = { sm: 44, md: 48, lg: 72 };
</script>

{#if src}
	<img class="app-icon-img {size}" {src} alt="" width={px[size]} height={px[size]} />
{:else}
	<span class="app-icon {size}" aria-hidden="true">{name.charAt(0)}</span>
{/if}

<style>
	.app-icon,
	.app-icon-img {
		flex: none;
	}
	.app-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #15171c;
		color: #ffffff;
		font-family: var(--font-display);
		font-weight: 700;
	}
	.sm {
		width: 44px;
		height: 44px;
		border-radius: 11px;
		font-size: 20px;
	}
	.md {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		font-size: 22px;
	}
	.lg {
		width: 72px;
		height: 72px;
		border-radius: 18px;
		font-size: 34px;
	}
	.app-icon-img {
		border-radius: 0;
	}
</style>

<script lang="ts">
	// Icône Meme-Pas-Dev : un « M » formé de trois briques.
	let { size = 32 }: { size?: number } = $props();
</script>

<svg class="logo" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
	<rect class="logo-bg" width="64" height="64" rx="15" />
	<rect x="13" y="16" width="11" height="32" rx="3.5" fill="#FFFFFF" />
	<rect x="40" y="16" width="11" height="32" rx="3.5" fill="#FFFFFF" />
	<rect x="26.5" y="16" width="11" height="17" rx="3.5" fill="#5CC9AE" />
</svg>

<style>
	.logo {
		flex: none;
	}
	.logo-bg {
		fill: var(--logo-bg, #15171c);
	}
</style>

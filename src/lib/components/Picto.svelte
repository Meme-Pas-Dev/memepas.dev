<script lang="ts">
	// Pastille arrondie teintée, avec une icône : accompagne un titre ou un texte, sans en être un.
	import { icons, type IconName, type Tint } from '$lib/icons';

	let { icon, tint = 'mint', size = 'md' }: { icon: IconName; tint?: Tint; size?: 'sm' | 'md' | 'lg' } = $props();
	const Icon = $derived(icons[icon]);
	const px = { sm: 16, md: 22, lg: 26 };
</script>

<span class="picto {size} tint-{tint}" aria-hidden="true"><Icon size={px[size]} strokeWidth={1.8} /></span>

<style>
	.picto {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		background: var(--tint-bg);
		color: var(--tint-fg);
	}
	.sm {
		width: 30px;
		height: 30px;
		border-radius: 9px;
	}
	.md {
		width: 44px;
		height: 44px;
		border-radius: 12px;
	}
	.lg {
		width: 52px;
		height: 52px;
		border-radius: 14px;
	}
</style>

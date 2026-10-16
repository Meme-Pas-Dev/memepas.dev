<script lang="ts">
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { t, type Lang } from '$lib/i18n';

	let {
		images,
		label,
		lang
	}: {
		images: { src: string; srcset: string; width: number; height: number; alt: string }[];
		label: string;
		lang: Lang;
	} = $props();
	const d = $derived(t(lang));

	let index = $state(0);
	const count = $derived(images.length);
	const current = $derived(images[index]);

	const go = (i: number) => (index = (i + count) % count);
</script>

<section class="carousel" aria-roledescription="carousel" aria-label={label}>
	<div class="stage">
		<figure class="frame">
			{#key index}
				<img
					src={current.src}
					srcset={current.srcset}
					sizes="(min-width: 1200px) 1000px, 92vw"
					width={current.width}
					height={current.height}
					alt={current.alt}
				/>
			{/key}
		</figure>
		{#if count > 1}
			<button type="button" class="nav prev" onclick={() => go(index - 1)} aria-label={d.app.previous}>
				<ChevronLeft size={20} />
			</button>
			<button type="button" class="nav next" onclick={() => go(index + 1)} aria-label={d.app.next}>
				<ChevronRight size={20} />
			</button>
		{/if}
	</div>
	<div class="footer">
		<p aria-live="polite">{current.alt}</p>
		{#if count > 1}
			<div class="dots">
				{#each images as _, i (i)}
					<button
						type="button"
						class="dot"
						aria-label="{d.app.showScreenshot} {i + 1}"
						aria-current={i === index ? 'true' : undefined}
						onclick={() => go(i)}><span></span></button
					>
				{/each}
				<span class="count">{index + 1} / {count}</span>
			</div>
		{/if}
	</div>
</section>

<style>
	.stage {
		position: relative;
		border-radius: 20px;
		background: var(--accent-soft);
		padding: clamp(16px, 5vw, 64px) clamp(16px, 6vw, 88px) 0;
		overflow: hidden;
	}
	.frame {
		margin: 0;
		border-radius: 12px 12px 0 0;
		overflow: hidden;
		box-shadow: var(--shadow);
		line-height: 0;
	}
	.frame img {
		width: 100%;
		height: auto;
	}
	.nav {
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		width: 48px;
		height: 48px;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: var(--surface);
		color: var(--ink);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.prev {
		left: 12px;
	}
	.next {
		right: 12px;
	}
	.footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 16px;
	}
	.footer p {
		margin: 0;
		font-weight: 600;
	}
	.dots {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.dot {
		width: 32px;
		height: 44px;
		border: none;
		background: transparent;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.dot span {
		display: block;
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--line);
	}
	.dot[aria-current='true'] span {
		width: 22px;
		background: var(--accent);
	}
	.count {
		margin-left: 8px;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--subtle);
	}
</style>

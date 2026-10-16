<script lang="ts">
	// Nom écrit du site : « même pas dev », avec « dev » barré.
	let { onDark = false }: { onDark?: boolean } = $props();
</script>

<span class="wordmark" class:on-dark={onDark}>même pas <span class="struck">dev</span></span>

<style>
	.wordmark {
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.struck {
		text-decoration: line-through;
		text-decoration-color: var(--accent);
		text-decoration-thickness: 0.14em;
	}
	.on-dark .struck {
		text-decoration-color: #5cc9ae;
	}
</style>

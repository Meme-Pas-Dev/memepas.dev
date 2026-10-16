<script lang="ts">
	// Met en forme `code` et **gras** dans un texte, sans jamais interpréter de HTML.
	let { text }: { text: string } = $props();

	type Part = { kind: 'text' | 'code' | 'strong'; value: string };

	const parts = $derived.by(() => {
		const result: Part[] = [];
		const pattern = /`([^`]+)`|\*\*([^*]+)\*\*/g;
		let last = 0;
		for (const match of text.matchAll(pattern)) {
			const index = match.index ?? 0;
			if (index > last) result.push({ kind: 'text', value: text.slice(last, index) });
			if (match[1] !== undefined) result.push({ kind: 'code', value: match[1] });
			else result.push({ kind: 'strong', value: match[2] });
			last = index + match[0].length;
		}
		if (last < text.length) result.push({ kind: 'text', value: text.slice(last) });
		return result;
	});
</script>

{#each parts as part, i (i)}{#if part.kind === 'code'}<code class="inline-code">{part.value}</code>{:else if part.kind === 'strong'}<strong>{part.value}</strong>{:else}{part.value}{/if}{/each}

<script lang="ts">
	import { Row } from '$lib/row';
	import { Button } from '$lib/button';

	let { code }: { code: string } = $props();
	let copied = $state(false);

	function formatCode(code: string): string {
		const lines = code.split('\n');
		const minIndent = lines
			.filter((line) => line.trim())
			.reduce((min, line) => {
				const indent = line.match(/^\s*/)[0].length;
				return Math.min(min, indent);
			}, Infinity);

		return lines
			.map((line) => line.slice(minIndent))
			.join('\n')
			.trim();
	}

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	let formattedCode = $derived(formatCode(code));
</script>

<Row
	items="start"
	justify="between"
	variant="solid"
	color="black"
	gap="xl"
	p="md"
	shape="rounded"
	width="100%"
>
	<pre><code>{formattedCode}</code></pre>
	<Button variant="soft" color="neutral" size="xs" onclick={copyCode}>
		{copied ? 'Copied' : 'Copy'}
	</Button>
</Row>

<style>
	pre {
		margin: 0;
		padding: 0;
		background: transparent;
		overflow-x: auto;
	}

	code {
		font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
		font-size: 14px;
		line-height: 1.5;
		text-shadow: none;
	}
</style>

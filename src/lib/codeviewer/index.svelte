<script lang="ts">
	import { Row } from '$lib/row';
	import { Button } from '$lib/button';

	let { code }: { code: string; language?: string } = $props();
	let copied = $state(false);
	let editorElement: HTMLElement;
	let editor: any;

	$effect(() => {
		if (window.CodeMirror && editorElement) {
			editor = window.CodeMirror(editorElement, {
				value: code,
				mode: 'jsx',
				theme: 'monokai',
				lineNumbers: false,
				lineWrapping: true,
				tabSize: 4,
				indentWithTabs: true,
				autofocus: false
			});

			editor.on('change', (instance: any) => {
				code = instance.getValue();
			});
		}
	});

	async function copyCode() {
		if (editor) {
			await navigator.clipboard.writeText(editor.getValue());
		} else {
			await navigator.clipboard.writeText(code);
		}
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/monokai.min.css"
	/>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/javascript/javascript.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/jsx/jsx.min.js"
	></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/xml/xml.min.js"
	></script>
</svelte:head>

<Row
	items="start"
	justify="between"
	variant="solid"
	color="neutral"
	colorweight="9"
	gap="sm"
	p="sm"
	shape="rounded"
	width="100%"
>
	<div class="editor-container" bind:this={editorElement}></div>
	<Button
		variant="soft"
		color="neutral"
		size="xs"
		onclick={copyCode}
		prefix={copied ? 'check' : 'content_copy'}
	/>
</Row>

<style>
	.editor-container {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	:global(.CodeMirror) {
		background-color: transparent !important;
		height: auto !important;
		font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
		font-size: 14px;
		line-height: 1.5;
		border-radius: 4px;
	}

	:global(.CodeMirror-cursor) {
		border-left: 2px solid #fff;
	}
</style>

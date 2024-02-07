<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface TabPanelsAttributes {
		id: string;
		class?: string;
		style?: string;
		children: Snippet;
	}

	let { id, class: _class, children, style } = $props<TabPanelsAttributes>();

	onMount(() => {
		if (!id) {
			throw new Error('TabPanels must have an id attribute');
		}
	});
</script>

<div {id} class="WuiTabPanels {_class || ''}" {style}>
	{@render children()}
</div>

<style>
	.WuiTabPanels {
		display: contents;
	}
	.WuiTabPanels > :global(*:not([tabindex='0'])) {
		display: none !important;
	}
</style>

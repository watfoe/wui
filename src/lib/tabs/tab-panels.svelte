<script context="module" lang="ts">
	import type { Snippet } from 'svelte';

	export interface TabPanelsAttributes {
		id: string;
		class?: string | null;
		children: Snippet;
	}
</script>

<script lang="ts">
	let { id, children, class: _class = '' }: TabPanelsAttributes = $props();

	if (!id) {
		throw new Error('TabPanels must have an id attribute');
	}
</script>

<div {id} class="WuiTabPanels {_class || ''}" style:display="contents">
	{@render children()}
</div>

<style>
	.WuiTabPanels > :global(*:not([tabindex='0'])) {
		display: none !important;
	}
</style>

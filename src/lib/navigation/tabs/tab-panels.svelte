<script context="module" lang="ts">
	import { getContext, type Snippet } from 'svelte';

	export interface TabPanelsAttributes {
		id: string;
		class?: string | null;
		style?: string | null;
		children: Snippet;
	}
</script>

<script lang="ts">
	let { id, class: _class, children, style }: TabPanelsAttributes = $props();
	let _this: HTMLDivElement;


	$effect(() => {
		getContext(_this);
	})

	$effect.pre(() => {
		if (!id) {
			throw new Error('TabPanels must have an id attribute');
		}
	});
</script>

<div bind:this={_this} {id} class="WuiTabPanels {_class || ''}" {style}>
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

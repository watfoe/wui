<script context="module" lang="ts">
	import { getContext } from 'svelte';

	export interface TabPanelAttributes extends FlexAttributes {}
</script>

<script lang="ts">
	import { Flex, type FlexAttributes } from '../flex';
	let {
		align = 'flex-start',
		children,
		class: _class = '',
		direction = 'column',
		justify = 'flex-start',
		height = '100%',
		width = '100%',
		...rest
	}: TabPanelAttributes = $props();
	let ctx: {
		id: string;
	} = getContext('wui-tabpanels-ctx');

	// The tabpanels are not rendered until the tab is selected.
	// This is to prevent rendering all the tabpanels at once.
	// Any subsequent selection/deselection of the tab will not trigger a re-render as it
	// will be controlled 'display: none !important;' in the css.
	let can_render = $state(false);
</script>

<Flex
	class="w-tabpanel {_class}"
	data-tabpanels-id={ctx.id}
	{align}
	{direction}
	{justify}
	{height}
	{width}
	onselect={() => (can_render = true)}
	{...rest}
>
	{#if can_render && children}
		{@render children()}
	{/if}
</Flex>

<style>
	:global(.w-tabpanel) {
		flex-grow: 1;
		overflow: auto;
	}
	:global(.w-tabpanel:not([tabindex='0'])) {
		display: none !important;
	}
</style>

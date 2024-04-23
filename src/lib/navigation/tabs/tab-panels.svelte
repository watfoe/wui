<script context="module" lang="ts">
	export interface TabPanelsAttributes {
		id: string;
		class?: string | null;
	}
</script>

<script lang="ts">
	let { id, class: _class = '' }: TabPanelsAttributes = $props();

	$effect.pre(() => {
		if (!id) {
			throw new Error('TabPanels must have an id attribute');
		}
	});
</script>

<div {id} class="WuiTabPanels {_class || ''}" style:display="contents">
	<slot />
</div>

<style>
	.WuiTabPanels > :global(*:not([tabindex='0'])) {
		display: none !important;
	}
</style>

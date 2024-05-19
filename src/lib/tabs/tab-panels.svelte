<script context="module" lang="ts">
	import { setContext, type Snippet } from 'svelte';

	export interface TabPanelsAttributes {
		id: string;
		children: Snippet;
	}
</script>

<script lang="ts">
	let { id, children }: TabPanelsAttributes = $props();

	if (!id) {
		throw new Error('TabPanels must have an id attribute');
	}

	setContext('wui-tabpanels-ctx', { id });
</script>

{@render children()}

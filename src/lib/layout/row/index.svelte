<script context="module" lang="ts">
	export interface RowAttributes extends Omit<FlexAttributes, 'direction'> {}
</script>

<script lang="ts">
	import Flex, { type FlexAttributes } from '../flex/index.svelte';

	let { ...rest }: RowAttributes = $props();
</script>

<Flex {...rest} direction="row" />

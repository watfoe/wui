<script context="module">
	import type { FlexAttributes } from '../flex/index.svelte';

	export interface RowAttributes extends Omit<FlexAttributes, 'direction'> {}
</script>

<script lang="ts">
	import Flex from '../flex/index.svelte';

	let { element, ...rest } = $props<RowAttributes>();
</script>

<Flex {...rest} direction="row" bind:element>
	<slot />
</Flex>

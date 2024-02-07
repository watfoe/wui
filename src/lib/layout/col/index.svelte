<script context="module">
	import type { FlexAttributes } from '../flex/index.svelte';

	export interface ColAttributes extends Omit<FlexAttributes, 'direction'> {}
</script>

<script lang="ts">
	import Flex from '../flex/index.svelte';

	let { element, ...rest } = $props<ColAttributes>();
</script>

<Flex {...rest} direction="column" bind:element>
	<slot />
</Flex>

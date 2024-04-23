<script context="module" lang="ts">
	import type { FlexAttributes } from '../flex/index.svelte';

	export interface ColAttributes extends Omit<FlexAttributes, 'direction'> {}
</script>

<script lang="ts">
	import Flex from '../flex/index.svelte';

	let { ...rest }: ColAttributes = $props();
</script>

<Flex {...rest} direction="column" />

<script context="module" lang="ts">
	export interface ColAttributes extends Omit<FlexAttributes, 'direction'> {}
</script>

<script lang="ts">
	import Flex, { type FlexAttributes } from '../flex';

	let { ...rest }: ColAttributes = $props();
</script>

<Flex {...rest} direction="column" />

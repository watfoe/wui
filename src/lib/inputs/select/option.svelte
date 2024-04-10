<script context="module" lang="ts">
	import type { ListboxItemAttributes } from '../listbox/item.svelte';

	export interface OptionAttributes extends Omit<ListboxItemAttributes, 'role'> {
		value: string;
	}
</script>

<script lang="ts">
	import { ListboxItem } from '$lib/inputs';

	let { ...rest }: OptionAttributes = $props();
</script>

<ListboxItem size="sm" {...rest} role="option">
	<slot />
</ListboxItem>

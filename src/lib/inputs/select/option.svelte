<script context="module" lang="ts">
	import type { ListItemAttributes } from '../listbox/item.svelte';

	export interface OptionAttributes extends Omit<ListItemAttributes, 'role'> {
		value: string;
	}
</script>

<script lang="ts">
	import { ListItem } from '$lib/inputs';

	let { ...rest }: OptionAttributes = $props();
</script>

<ListItem size="sm" {...rest} role="option">
	<slot />
</ListItem>

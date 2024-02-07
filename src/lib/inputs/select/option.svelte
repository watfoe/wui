<script lang="ts">
	import { ListItem } from '$lib/inputs';
	import type { ListItemAttributes } from '../listbox/item.svelte';

	interface OptionAttributes extends ListItemAttributes {
		value: string;
	}

	let { value, ...rest } = $props<OptionAttributes>();
</script>

<ListItem role="option" {...rest} size="sm" {value}>
	<slot />
</ListItem>

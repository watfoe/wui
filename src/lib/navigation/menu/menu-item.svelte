<script lang="ts">
	import { ListItem } from '$lib/inputs';
	import type { ListItemAttributes } from '$lib/inputs/listbox/item.svelte';

	let { ...rest } = $props<ListItemAttributes>();
</script>

<ListItem {...rest} role="menuitem" on:select>
	<slot />
</ListItem>

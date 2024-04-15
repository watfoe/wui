<script context="module" lang="ts">
	import type { ListboxItemAttributes } from '../listbox/listbox-item.svelte';

	export interface OptionAttributes extends Omit<ListboxItemAttributes, 'role'> {
		value: string;
	}
</script>

<script lang="ts">
	import { ListboxItem } from '$lib/inputs';

	let { ...rest }: OptionAttributes = $props();
</script>

<ListboxItem {...rest} role="option" />

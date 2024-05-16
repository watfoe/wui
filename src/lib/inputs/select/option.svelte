<script context="module" lang="ts">
	export interface OptionAttributes extends Omit<ListboxItemAttributes, 'role'> {
		value: string;
	}
</script>

<script lang="ts">
	import ListboxItem, { type ListboxItemAttributes } from '../listbox/listbox-item.svelte';

	let { ...rest }: OptionAttributes = $props();
</script>

<ListboxItem {...rest} role="option" />

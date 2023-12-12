<script lang="ts">
	import { ListItem } from "$lib/inputs";
	import type { ListItemProps } from "../listbox/item.svelte";

  interface $$Props extends ListItemProps {
    value: string;
  }

  export let value: $$Props['value'];
</script>

<ListItem role="option" size="sm" {value} {...$$restProps} on:click>
  <slot />
</ListItem>

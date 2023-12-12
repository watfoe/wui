<script lang="ts">
	import { ListItem } from '$lib/inputs';
</script>


<ListItem {...$$restProps} role="menuitem" on:select>
  <slot />
</ListItem>

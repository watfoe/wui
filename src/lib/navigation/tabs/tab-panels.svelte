<script lang="ts">
	import { onMount } from "svelte";

  interface $$Props {
    id: string;
    class?: string;
    style?: string;
  }
  export let id: $$Props['id'];

  onMount(() => {
    if (!id) {
      throw new Error('TabPanels must have an id attribute');
    }
  })
</script>

<div id={id} class="WuiTabPanels {$$restProps.class || ''}" style="{$$restProps.style}">
  <slot />
</div>
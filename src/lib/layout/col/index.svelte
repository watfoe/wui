<script context="module" lang="ts">
  import type { FlexProps } from '../flex/index.svelte';
  export interface ColProps extends Omit<FlexProps, 'direction'> {}
</script>

<script lang="ts">
  import Flex from '../flex/index.svelte';
  interface $$Props extends ColProps {};

  export let element: $$Props['element'] = undefined;
</script>

<Flex {...$$restProps} direction="column" bind:element={element} on:click on:dblclick>
  <slot/>
</Flex>
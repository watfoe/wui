<script context="module" lang="ts">
  import type { FlexProps } from '../flex/index.svelte';
  export interface ColProps extends Omit<FlexProps, 'direction'> {}
</script>

<script lang="ts">
  import Flex from '../flex/index.svelte';
  interface $$Props extends ColProps {};
</script>

<Flex {...$$restProps} direction="column" class={$$restProps.class} on:*>
  <slot/>
</Flex>
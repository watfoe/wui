<script context="module" lang="ts">
  import type { FlexProps } from '../flex/index.svelte';
  export interface RowProps extends Omit<FlexProps, 'direction'> {}
</script>

<script lang="ts">
  import Flex from '../flex/index.svelte';
  interface $$Props extends RowProps {};
</script>

<Flex direction="row" {...$$restProps} class={$$restProps.class} on:*>
  <slot/>
</Flex>
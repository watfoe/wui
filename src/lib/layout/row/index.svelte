<script context="module" lang="ts">
  import type { FlexProps } from '../flex/index.svelte';
  export interface RowProps extends Omit<FlexProps, 'direction'> {}
</script>

<script lang="ts">
  import Flex from '../flex/index.svelte';
  interface $$Props extends RowProps {};
</script>

<Flex align="center" {...$$restProps} direction="row" on:*>
  <slot/>
</Flex>

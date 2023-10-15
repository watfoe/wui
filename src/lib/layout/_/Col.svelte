<script context="module" lang="ts">
  import type FlexProps from './Flex.svelte';
  export interface ColProps extends Omit<FlexProps, 'direction'> {}
</script>

<script lang="ts">
  import Flex from './Flex.svelte';
  interface $$Props extends ColProps {};
</script>

<Flex {...$$restProps} direction="column" class={$$restProps.class} on:*>
  <slot/>
</Flex>
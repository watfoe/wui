<script lang="ts">
  import { Col } from "$lib/layout";
  import { Text } from "$lib/typography";
	import type { HTMLLabelAttributes } from 'svelte/elements';

  interface $$Props extends HTMLLabelAttributes {
    description?: string;
  }

  export let description: $$Props['description'] = undefined;
</script>

<Col justify="flex-start" align="flex-start" gap="sm" class="WuiInput__label__root">
  <Text variant="label" size="md" bold class="WuiInput__label" {...$$restProps} >
    <slot />
  </Text>

  {#if description}
    <Text variant="label" size="md" class="WuiInput__label__desc">{description}</Text>
  {/if}
</Col>

<style>
  :global(.WuiInput__label__root) {
    width: 100% !important;
    max-width: calc(100% - (2*var(--space-nm)));
    margin-left: var(--space-nm);
  }

  :global(.WuiInput__label), :global(.WuiInput__label__desc) {
    color: var(--WuiLabel-color, var(--color-on-surface-variant)) !important;
    overflow: hidden;
  }
</style>

<script lang="ts">
  import { Col } from "$lib/layout";
  import { Text } from "$lib/typography";
	import type { HTMLLabelAttributes } from 'svelte/elements';

  interface $$Props extends HTMLLabelAttributes {
    description?: string;
  }

  export let description: $$Props['description'] = undefined;
</script>

<Col justify="flex-start" align="flex-start" class="WuiInput__label__root">
  <Text variant="label" size="md" bold class="WuiInput__label" {...$$restProps}>
    {#if $$slots.default}
      <slot />
    {/if}
  </Text>

  {#if $$slots.description}
    <Text variant="label" size="sm" color="neutral" class="WuiInput__label__desc">
      <slot name="description" />
    </Text>
  {:else if description}
    <Text variant="label" size="sm" color="neutral" class="WuiInput__label__desc">{description}</Text>
  {/if}
</Col>

<style>
  :global(.WuiInput__label__root) {
    width: 100% !important;
    max-width: calc(100% - (2*var(--space-nm)));
    margin-left: var(--space-nm);
  }
  :global(.WuiInput__label) {
    color: var(--WuiLabel-color, var(--color-black-1)) !important;
    margin-bottom: 1px;
  }

  :global(.WuiInput__label__desc) {
    margin-bottom: 3px;
  }
</style>

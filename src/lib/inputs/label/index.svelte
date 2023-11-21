<script lang="ts">
  import { Col } from "$lib/layout";
	import type { HTMLLabelAttributes } from 'svelte/elements';

  interface $$Props extends HTMLLabelAttributes {
    description?: string;
  }

  export let description: $$Props['description'] = undefined;
</script>

<Col justify="flex-start" align="flex-start" class="WuiLabel__root">
  <label {...$$restProps} class="WuiLabel">
    <slot />
  </label>

  {#if description}
    <span class="WuiLabel__desc">{description}</span>
  {/if}
</Col>

<style>
  :global(.WuiLabel__root) {
    width: 100% !important;
    max-width: calc(100% - (2*var(--space-md)));
    margin-left: var(--space-md);
  }

  .WuiLabel {
    color: var(--WuiLabel-color, var(--color-on-surface-variant));
    font-size: 0.75rem;
    line-height: 0.75rem;
    overflow: hidden;
  }

  .WuiLabel__desc {
    color: var(--color-on-surface-variant);
    font-size: 0.75rem;
    margin: 1px 0;
    overflow: hidden;
  }
</style>

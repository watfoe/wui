<script lang="ts">
  import './style.css';
  import { Col } from "$lib/layout";
	import type { HTMLLabelAttributes } from 'svelte/elements';

  interface $$Props extends HTMLLabelAttributes {
    description?: string;
  }

  export let description: $$Props['description'] = undefined;
</script>

<Col justify="flex-start" align="flex-start" class="WuiLabel-root">
  <label {...$$restProps} class="WuiLabel">
    <slot />
  </label>

  {#if description}
    <span class="WuiLabel-desc">{description}</span>
  {/if}
</Col>

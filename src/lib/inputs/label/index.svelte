<script lang="ts">
  import './style.css';
  import { Col } from "$lib/layout";
	import type { HTMLLabelAttributes } from 'svelte/elements';

  interface $$Props extends HTMLLabelAttributes {
    focused: boolean;
    errored: boolean;
    description?: string;
  }

  export let focused: $$Props['focused'] = false;
  export let errored: $$Props['errored'] = false;
  export let description: $$Props['description'] = undefined;
</script>

<Col justify="flex-start" align="flex-start" class="WuiLabel-root">
  <label
    {...$$restProps}
    class="WuiLabel WuiLabel-{focused ? 'focused' : ''} WuiLabel-{errored ? 'errored' : ''}"
  >
    <slot />
  </label>

  {#if description}
    <span class="WuiLabel-desc">{description}</span>
  {/if}
</Col>

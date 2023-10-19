<script context="module" lang="ts">
  import type { FlexKeys } from '$lib/layout';
	import type { HTMLButtonAttributes } from 'svelte/elements';

  export interface ClickableProps extends FlexKeys, HTMLButtonAttributes {}
</script>

<script lang="ts">
  type $$Props = ClickableProps;

  export let direction: $$Props['direction'] = 'row';
  export let justify: $$Props['justify'] = 'center';
  export let align: $$Props['align'] = 'center';
  export let wrap: $$Props['wrap'] = 'nowrap';
  export let gap: $$Props['gap'] = undefined;
</script>

<button
  {...$$restProps}
  class="cs-clickable {$$restProps.class || ''}"
  style="
    --direction:{direction};
    --justify:{justify};
    --align:{align};
    --wrap:{wrap};
    --gap:{gap || '3'}px;
  "
  on:click on:blur on:dblclick on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
  on:drop on:focus on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout on:mouseover
>
  <slot />
</button>

<style>
  @import './style.scss';
</style>

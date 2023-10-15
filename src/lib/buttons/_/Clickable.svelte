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
  class="clickable {$$restProps.class || ''}"
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

<style lang="scss">
  .clickable {
    align-items: var(--align, center);
    background-color: transparent;
    border: 0;
    display: flex !important;
    flex-direction: var(--direction, row);
    gap: var(--gap);
    justify-content: var(--justify, center);
    flex-wrap: var(--wrap, nowrap);
    outline: 0;
    width: auto;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }
</style>

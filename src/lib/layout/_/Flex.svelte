<script context="module" lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';

  export interface FlexKeys {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    wrap?: 'wrap' | 'nowrap';
    gap?: string;
  }

  export interface FlexProps extends HTMLAttributes<HTMLDivElement>,  FlexKeys {}
</script>

<script lang="ts">
  interface $$Props extends FlexProps {};

  export let direction: $$Props['direction'] = 'row';
  export let justify: $$Props['justify'] = 'flex-start';
  export let align: $$Props['align'] = 'center';
  export let wrap: $$Props['wrap'] = 'nowrap';
  export let gap: $$Props['gap'] = undefined;
</script>

<div
  {...$$restProps}
  class="flex {$$restProps.class || ''}"
  style="
    {$$restProps.style || ''};
    --direction:{direction};
    --justify:{justify};
    --align:{align};
    --wrap:{wrap};
    --gap:{gap || '0'}px;
  "
  on:*
>
  <slot/>
</div>

<style>
  .flex {
    display: flex !important;
    flex-direction: var(--direction, row);
    justify-content: var(--justify, flex-start);
    align-items: var(--align, center);
    flex-wrap: var(--wrap, nowrap);
    width: 100%;
    gap: var(--gap);
  }
</style>
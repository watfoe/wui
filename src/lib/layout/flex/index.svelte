<script context="module" lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';

  export interface FlexKeys {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    wrap?: 'wrap' | 'nowrap';
    gap?: 'xs' | 'sm' | 'nm' | 'md' | 'lg';
  }

  export interface FlexProps extends HTMLAttributes<HTMLDivElement>,  FlexKeys {}
</script>

<script lang="ts">
  import './style.css';

  interface $$Props extends FlexProps {};

  export let direction: $$Props['direction'] = 'row';
  export let justify: $$Props['justify'] = 'flex-start';
  export let align: $$Props['align'] = 'center';
  export let wrap: $$Props['wrap'] = 'nowrap';
  export let gap: $$Props['gap'] = undefined;
</script>

<div
  {...$$restProps}
  class="WuiFlex {gap ? 'WuiFlex-gap-' + gap : ''} {$$restProps.class || ''}"
  style="
    {$$restProps.style || ''};
    --WuiFlex-direction:{direction};
    --WuiFlex-justify:{justify};
    --WuiFlex-align:{align};
    --WuiFlex-wrap:{wrap};
  "
  on:*
>
  <slot/>
</div>

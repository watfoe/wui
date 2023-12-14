<script context="module" lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';

  export interface FlexKeys {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    wrap?: 'wrap' | 'nowrap';
    gap?: 'xs' | 'sm' | 'nm' | 'md' | 'lg';
    width?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
    height?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
    element?: HTMLDivElement;
  }

  export interface FlexProps extends HTMLAttributes<HTMLDivElement>,  FlexKeys {}
</script>

<script lang="ts">
  interface $$Props extends FlexProps {};

  export let direction: $$Props['direction'] = 'row';
  export let element: $$Props['element'] = undefined;
  export let justify: $$Props['justify'] = 'flex-start';
  export let align: $$Props['align'] = 'center';
  export let wrap: $$Props['wrap'] = 'nowrap';
  export let gap: $$Props['gap'] = undefined;
  export let width: $$Props['width'] = undefined;
  export let height: $$Props['height'] = undefined;
</script>

<div
  {...$$restProps}
  class="WuiFlex {gap ? 'WuiFlex--gap-' + gap : ''} {width ? 'WuiFlex--width-' + width : ''} {height ? 'WuiFlex--height-' + height : ''} {$$restProps.class || ''}"
  style="
    {$$restProps.style || ''};
    --WuiFlex-direction:{direction};
    --WuiFlex-justify:{justify};
    --WuiFlex-align:{align};
    --WuiFlex-wrap:{wrap};
  "
  bind:this={element}
  on:*
>
  <slot/>
</div>

<style>
  .WuiFlex {
    display: flex;
    flex-direction: var(--WuiFlex-direction, row);
    justify-content: var(--WuiFlex-justify, flex-start);
    align-items: var(--WuiFlex-align, flex-start);
    flex-wrap: var(--WuiFlex-wrap, nowrap);
  }
  .WuiFlex--gap-xs {gap: var(--space-xs);}
  .WuiFlex--gap-sm {gap: var(--space-sm);}
  .WuiFlex--gap-nm {gap: var(--space-nm);}
  .WuiFlex--gap-md {gap: var(--space-md);}
  .WuiFlex--gap-lg {gap: var(--space-lg);}

  .WuiFlex--width-full {width: 100%;}
  .WuiFlex--width-half {width: 50%;}
  .WuiFlex--width-third {width: 33.333333%;}
  .WuiFlex--width-quarter {width: 25%;}
  .WuiFlex--width-auto {width: auto;}
  .WuiFlex--width-inherit {width: inherit;}

  .WuiFlex--height-full {height: 100%;}
  .WuiFlex--height-half {height: 50%;}
  .WuiFlex--height-third {height: 33.333333%;}
  .WuiFlex--height-quarter {height: 25%;}
  .WuiFlex--height-auto {height: auto;}
  .WuiFlex--height-inherit {height: inherit;}
</style>

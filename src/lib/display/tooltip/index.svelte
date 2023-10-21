<script lang="ts">
  interface $$Props {
    title: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  }

  export let title: string;
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  let top: number = 0;
  let left: number = 0;

  let tooltip: HTMLDivElement;

  function mouseenter() {
    const {top: t, left: l} = tooltip.getBoundingClientRect();
    top = t;
    left = l;
  }
</script>

<div
  aria-label="tooltip"
  role="tooltip"
  bind:this={tooltip}
  class="tooltip pos-{position}"
  data-tooltip-title={title}
  on:mouseenter={mouseenter}
  style="--top:{top}px;--left:{left}px">
  <slot />
</div>

<style>
  @import './style.css';
</style>

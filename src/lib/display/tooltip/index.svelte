<script lang="ts">
  interface $$Props {
    title: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    variant?: 'solid' | 'outline' | 'plain' | 'soft';
  }

  export let title: string;
  export let position: $$Props['position'] = 'bottom';

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
  aria-label={title}
  role="tooltip"
  bind:this={tooltip}
  class="WuiTooltip WuiTooltip-{position} "
  data-tooltip-title={title}
  on:mouseenter={mouseenter}>
  <slot />
</div>

<style>
  @import './style.css';
</style>

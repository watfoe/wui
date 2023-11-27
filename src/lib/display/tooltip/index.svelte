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
  .WuiTooltip {
    position: relative !important;
    display: inline-flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: auto !important;
    z-index: 10000;
  }
  .WuiTooltip::after {
    background-color: rgba(0, 0, 0, 0.6);
    color: var(--color-on-primary);
    border-radius: var(--radius);
    content: attr(data-tooltip-title);
    font-size: 0.75rem;
    position: absolute;
    padding: var(--space-xs) var(--space-sm);
    white-space: nowrap;
    display: none;
  }
  .WuiTooltip:hover::after {
    display: block;
  }
  .WuiTooltip-left::after {
    left: calc(100% + var(--space-xs));
    top: auto;
    bottom: auto
  }
  .WuiTooltip-right::after {
    right: calc(100% + var(--space-xs));
    top: auto;
    bottom: auto
  }
  .WuiTooltip-top::after {
    bottom: calc(100% + var(--space-xs));
    margin: 0 auto;
  }
  .WuiTooltip-bottom::after {
    top: calc(100% + var(--space-xs));
  }
  .WuiTooltip-top-left::after {
    bottom: calc(100% + var(--space-xs));
    left: 0;
  }
  .WuiTooltip-top-right::after {
    bottom: calc(100% + var(--space-xs));
    right: 0;
  }
  .WuiTooltip-bottom-left::after {
    top: calc(100% + var(--space-xs));
    left: 0;
  }
  .WuiTooltip-bottom-right::after {
    top: calc(100% + var(--space-xs));
    right: 0;
  }
</style>

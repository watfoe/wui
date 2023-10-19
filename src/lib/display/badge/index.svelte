<script lang="ts">
  interface $$Props {
    count: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  }

  export let count: string;
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  let top: number = 0;
  let left: number = 0;

  let badge: HTMLDivElement;
</script>

<div
  aria-label="badge"
  bind:this={badge}
  class="badge pos-{position}"
  data-badge-count={count}
  style="--top:{top}px;--left:{left}px">
  <slot />
</div>

<style>
  @import './style.scss';
</style>

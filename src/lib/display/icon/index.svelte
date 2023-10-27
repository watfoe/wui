<script context="module" lang="ts">
  export interface IconProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    fill?: '0' | '1';
    class?: string;
  }
</script>

<script lang="ts">
  interface $$Props extends IconProps {}

  export let size: $$Props['size'] = 'md';
  export let fill: $$Props['fill'] = '0';
</script>

<span
  role="img"
  aria-label="icon"
  class="material-symbols-rounded WuiIcon WuiIcon-{size} {$$restProps.class || ''}"
  style='--size:{size}px;--fill:{fill}' on:*>
  <slot />
</span>

<style>
  .WuiIcon {
    color: inherit;
    font-size: var(--size);
    font-variation-settings: 'FILL' var(--fill);
  }

  .WuiIcon-sm {
    font-size: 18px;
  }

  .WuiIcon-md {
    font-size: 20px;
  }

  .WuiIcon-lg {
    font-size: 24px;
  }
</style>
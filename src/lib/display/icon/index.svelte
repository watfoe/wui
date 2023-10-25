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
  class="material-symbols-rounded Wui-icon Wui-icon-{size} {$$restProps.class || ''}"
  style='--size:{size}px;--fill:{fill}' on:*>
  <slot />
</span>

<style>
  .Wui-icon {
    color: inherit;
    font-size: var(--size);
    font-variation-settings: 'FILL' var(--fill);
  }

  .Wui-icon-sm {
    font-size: 18px;
  }

  .Wui-icon-md {
    font-size: 20px;
  }

  .Wui-icon-lg {
    font-size: 24px;
  }
</style>
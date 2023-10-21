<script context="module" lang="ts">
  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    fill?: '0' | '1';
    class?: string;
  }
</script>

<script lang="ts">
  interface $$Props extends IconProps {}

  export let name: $$Props['name'];
  export let size: $$Props['size'] = 18;
  export let fill: $$Props['fill'] = '0';
</script>

<span
  role="img"
  aria-label="icon"
  class="material-symbols-rounded {$$restProps.class || ''}"
  style='--size:{size}px;--fill:{fill}' on:*>
  {name}
</span>

<style>
  span {
    color: inherit;
    font-size: var(--size);
    font-variation-settings: 'FILL' var(--fill);
  }
</style>
<script context="module" lang="ts">
  export interface IconProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit';
    fill?: '0' | '1';
    class?: string;
  }
</script>

<script lang="ts">
  interface $$Props extends IconProps {}

  export let size: $$Props['size'] = 'md';
  export let fill: $$Props['fill'] = '0';
  export let color: $$Props['color'] = 'inherit';
</script>

<span
  role="img"
  aria-label="icon"
  class="material-symbols-rounded WuiIcon WuiIcon-{size} WuiIcon-{color} {$$restProps.class || ''}"
  on:*>
  <slot />
</span>

<style>
  .WuiIcon {
    color: var(--WuiIcon-color);
    font-size: var(--WuiIcon-size);
    font-variation-settings: 'FILL' var(--fill);
  }

  .WuiIcon-primary {
    --WuiIcon-color: var(--color-primary);
  }
  .WuiIcon-neutral {
    --WuiIcon-color: var(--color-neutral);
  }
  .WuiIcon-success {
    --WuiIcon-color: var(--color-success);
  }
  .WuiIcon-warning {
    --WuiIcon-color: var(--color-warning);
  }
  .WuiIcon-danger {
    --WuiIcon-color: var(--color-danger);
  }
  .WuiIcon-inherit {
    --WuiIcon-color: inherit;
  }

  .WuiIcon-sm {
    --WuiIcon-size: 18px;
  }
  .WuiIcon-md {
    --WuiIcon-size: 20px;
  }
  .WuiIcon-lg {
    --WuiIcon-size: 24px;
  }
</style>
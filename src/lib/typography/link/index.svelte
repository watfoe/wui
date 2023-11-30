<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  interface $$Props extends HTMLAnchorAttributes {
    color?: 'inherit' | 'link';
    underline?: boolean;
  }

  export let color: $$Props['color'] = 'link';
  export let underline: $$Props['underline'] = true;
</script>

<a href="{$$restProps.href}" class="WuiAnchor WuiAnchor--{color} {underline ? 'WuiAnchor--underline' : ''} {$$restProps.class || ''}" {...$$restProps}>
  <slot />
</a>

<style>
  .WuiAnchor {
    cursor: pointer;
    text-decoration: none;
  }

  .WuiAnchor--inherit {
    color: inherit;
  }

  .WuiAnchor--link {
    color: var(--color-link);
  }

  .WuiAnchor--underline {
    text-decoration: underline;
  }
</style>
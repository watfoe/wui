<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  interface $$Props extends HTMLAnchorAttributes {
    color?: 'inherit' | 'link';
    italic?: boolean;
    underline?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'headline' | 'title' | 'body' | 'label' | 'code';
  }

  export let color: $$Props['color'] = 'link';
  export let italic: $$Props['italic'] = false;
  export let underline: $$Props['underline'] = false;
  export let size: $$Props['size'] = 'md';
  export let variant: $$Props['variant'] = 'body';
</script>

<a href="{$$restProps.href}" class="WuiAnchor WuiAnchor--{variant} WuiAnchor--{size} WuiAnchor--{color} {underline ? 'WuiAnchor--underline' : ''} {$$restProps.class || ''}" {...$$restProps}>
  <slot />
</a>

<style>
  .WuiAnchor {
    cursor: pointer;
    display: inline-block;
    font-size: var(--WuiAnchor-font-size);
    line-height: var(--WuiAnchor-line-height);
    text-decoration: none;
  }

  .WuiAnchor--inherit {
    color: inherit;
  }
  .WuiAnchor--link {
    color: var(--color-link);
  }

  .WuiAnchor--headline.WuiAnchor--sm {
    --WuiAnchor-font-size: 1.5rem;
    --WuiAnchor-line-height: 2rem;
  }
  .WuiAnchor--headline.WuiAnchor--md {
    --WuiAnchor-font-size: 1.75rem;
    --WuiAnchor-line-height: 2.25rem;
  }
  .WuiAnchor--headline.WuiAnchor--lg {
    --WuiAnchor-font-size: 2rem;
    --WuiAnchor-line-height: 2.5rem;
  }

  .WuiAnchor--title.WuiAnchor--sm {
    --WuiAnchor-font-size: 1rem;
    --WuiAnchor-line-height: 1.25rem;
  }
  .WuiAnchor--title.WuiAnchor--md {
    --WuiAnchor-font-size: 1.125rem;
    --WuiAnchor-line-height: 1.5rem;
  }
  .WuiAnchor--title.WuiAnchor--lg {
    --WuiAnchor-font-size: 1.25rem;
    --WuiAnchor-line-height: 1.75rem;
  }

  .WuiAnchor--body.WuiAnchor--sm, .WuiAnchor--label.WuiAnchor--sm {
    --WuiAnchor-font-size: 0.75rem;
    --WuiAnchor-line-height: 0.875rem;
  }
  .WuiAnchor--body.WuiAnchor--md, .WuiAnchor--label.WuiAnchor--md {
    --WuiAnchor-font-size: 0.8125rem;
    --WuiAnchor-line-height: 1rem;
  }
  .WuiAnchor--body.WuiAnchor--lg, .WuiAnchor--label.WuiAnchor--lg {
    --WuiAnchor-font-size: 0.9375rem;
    --WuiAnchor-line-height: 1.125rem;
  }

  .WuiAnchor--label.WuiAnchor--sm {
    --WuiAnchor-font-size: 0.6875rem;
    --WuiAnchor-line-height: 0.8125rem;
  }
  .WuiAnchor--label.WuiAnchor--md {
    --WuiAnchor-font-size: 0.75rem;
    --WuiAnchor-line-height: 0.875rem;
  }
  .WuiAnchor--label.WuiAnchor--lg {
    --WuiAnchor-font-size: 0.8125rem;
    --WuiAnchor-line-height: 0.9375rem;
  }

  .WuiAnchor--code.WuiAnchor--sm {
    --WuiAnchor-font-size: 0.75rem;
    --WuiAnchor-line-height: 1rem;
  }
  .WuiAnchor--code.WuiAnchor--md {
    --WuiAnchor-font-size: 0.875rem;
    --WuiAnchor-line-height: 1.25rem;
  }
  .WuiAnchor--code.WuiAnchor--lg {
    --WuiAnchor-font-size: 1rem;
    --WuiAnchor-line-height: 1.5rem;
  }

  .WuiAnchor--underline {
    text-decoration: underline;
  }
</style>
<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

  export interface ButtonProps extends HTMLButtonAttributes {
    icon?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'plain';
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    gap?: string;
    loading?: boolean;
  }
</script>

<script lang="ts">
  import './style.css';
  import {Icon} from '$lib/display';

  interface $$Props extends ButtonProps {}
  export let gap: $$Props['gap'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let variant: $$Props['variant'] = 'solid';
  export let color: $$Props['color'] = 'primary';
  export let icon: $$Props['icon'] = undefined;
  export let loading: $$Props['loading'] = false;
  export let disabled: $$Props['disabled'] = false;
</script>

<button
  {...$$restProps}
  class="WuiButton WuiButton-{variant} WuiButton-{size} WuiButton-{color} {!$$slots.default ? 'WuiButton-only-icon' : ''} {$$restProps.class || ''}"
  style="{gap && `--WuiButton-flex-gap: ${gap}`}"
  disabled="{loading || disabled}"
  on:*
>
  {#if loading}
    <span class="WuiButton-loader" />
  {:else}
    {#if $$slots.icon}
      <slot name="icon" />
    {:else if icon}
      <Icon size="sm">{icon}</Icon>
    {/if}

    <slot />
  {/if}
</button>

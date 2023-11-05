<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

  export interface ButtonProps extends HTMLButtonAttributes {
    icon?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    gap?: 'sm' | 'nm' | 'md' | 'lg';
    loading?: boolean;
  }
</script>

<script lang="ts">
  import css from './style.module.css';
  import {Icon} from '$lib/display';

  interface $$Props extends ButtonProps {}

  export let gap: $$Props['gap'] = 'nm';
  export let size: $$Props['size'] = 'md';
  export let variant: $$Props['variant'] = 'solid';
  export let color: $$Props['color'] = 'primary';
  export let icon: $$Props['icon'] = undefined;
  export let loading: $$Props['loading'] = false;
  export let disabled: $$Props['disabled'] = false;
</script>

<button
  {...$$restProps}
  class="
    {css['WuiButton']}
    {css[`WuiButton-${variant}`]}
    {css[`WuiButton-${size}`]}
    {css[`WuiButton-${color}`]}
    {css[`WuiButton-gap-${gap}`]}
    {!$$slots.default ? css['WuiButton-only-icon'] : ''}
    {$$restProps.class || ''}
  "
  disabled="{loading || disabled}"
  on:*
>
  {#if loading}
    <span class="{css['WuiButton-loader']}" />
  {:else}
    {#if $$slots.icon}
      <slot name="icon" />
    {:else if icon}
      <Icon size={size}>{icon}</Icon>
    {/if}
    <slot />
  {/if}
</button>

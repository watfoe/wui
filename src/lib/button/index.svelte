<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

  export interface ButtonProps extends HTMLButtonAttributes {
    icon?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    gap?: 'sm' | 'nm' | 'md' | 'lg';
    loading?: boolean;
    anchorfor?: string;
  }
</script>

<script lang="ts">
  import './style.css';
  import {Icon} from '$lib/display';
	import { onMount } from 'svelte';

  interface $$Props extends ButtonProps {}

  export let gap: $$Props['gap'] = 'nm';
  export let size: $$Props['size'] = 'md';
  export let variant: $$Props['variant'] = 'solid';
  export let color: $$Props['color'] = 'primary';
  export let icon: $$Props['icon'] = undefined;
  export let loading: $$Props['loading'] = false;
  export let disabled: $$Props['disabled'] = false;
  export let anchorfor: $$Props['anchorfor'] = undefined;

  let feedback: HTMLDialogElement;

  onMount(() => {
    if (anchorfor) {
      const _feedback = document.getElementById(anchorfor);

      if (_feedback instanceof HTMLDialogElement) {
        feedback = _feedback;
      } else {
        throw new Error(`button "anchorfor" attribute must be a valid dialog id`);
      }
    }
  });

  function click(e: CustomEvent<HTMLButtonElement>) {
    feedback?.dispatchEvent(new CustomEvent('open', { detail: {
      anchor: e.currentTarget,
    }}));
  };
</script>

<button
  {...$$restProps}
  class="WuiButton WuiButton--{variant} WuiButton--{size} WuiButton--{color} WuiButton--gap-{gap} {!$$slots.default ? 'WuiButton--only-icon' : ''} {$$restProps.class || ''}"
  disabled="{loading || disabled}"
  on:click={click}
  on:*
>
  {#if loading}
    <span class="WuiButton__loader" />
  {:else}
    {#if $$slots.icon}
      <slot name="icon" />
    {:else if icon}
      <Icon size={size}>{icon}</Icon>
    {/if}
    <slot />
  {/if}
</button>

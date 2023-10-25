<script context="module" lang="ts">
	import { Col } from '$lib/layout';
  import type { HTMLImgAttributes } from 'svelte/elements';
	import { Icon } from '..';
  export interface AvatarProps extends HTMLImgAttributes {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'outline' | 'soft' | 'plain';
  }
</script>

<script lang="ts">
	interface $$Props extends AvatarProps {}

  export let size: $$Props['size'] = 'md';
  export let variant: $$Props['variant'] = 'soft';
</script>

<Col
  role="img"
  justify="center"
  class="Wui-avatar Wui-avatar-{size} Wui-avatar-{variant} {$$restProps.class || ''}"
  {...$$restProps}
  on:*
>
  {#if $$restProps.src}
    <img src={$$restProps.src} {...$$restProps} alt={$$restProps.alt} class="Wui-avatar-img"  />
  {:else if $$restProps.alt}
    <span class="Wui-avatar-alt">{$$restProps.alt[0].toUpperCase()}</span>
  {:else if !$$slots.default}
    <Icon>person</Icon>
  {:else}
    <span class="Wui-avatar-alt"><slot /></span>
  {/if}
</Col>

<style>
  @import './style.css';
</style>

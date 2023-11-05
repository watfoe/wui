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
  import './style.css';

	interface $$Props extends AvatarProps {}

  export let alt: $$Props['alt'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let variant: $$Props['variant'] = 'soft';
</script>

<Col
  role="img"
  aria-label={alt || 'Avatar'}
  justify="center"
  class="WuiAvatar WuiAvatar-{size} WuiAvatar-{variant} {$$restProps.class || ''}"
  {...$$restProps}
  on:*
>
  {#if $$restProps.src}
    <img src={$$restProps.src} {...$$restProps} alt={alt} class="WuiAvatar-img"  />
  {:else if alt}
    <span class="WuiAvatar-alt">{alt[0].toUpperCase()}</span>
  {:else if !$$slots.default}
    <Icon>person</Icon>
  {:else}
    <span class="WuiAvatar-alt"><slot /></span>
  {/if}
</Col>

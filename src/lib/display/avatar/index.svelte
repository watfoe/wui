<script context="module" lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';

  export interface AvatarProps extends HTMLImgAttributes {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'outline' | 'soft' | 'plain';
  }
</script>

<script lang="ts">
  import './style.css';
  import { Col } from '$lib/layout';
  import { Text } from '$lib/typography';
  import { Icon } from '..';

	interface $$Props extends AvatarProps {}

  export let alt: $$Props['alt'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let variant: $$Props['variant'] = 'soft';
</script>

<Col
  role="img"
  aria-label={alt || 'Avatar'}
  align="center"
  justify="center"
  class="WuiAvatar WuiAvatar--{size} WuiAvatar--{variant} {$$restProps.class || ''}"
  {...$$restProps}
  on:*
>
  {#if $$restProps.src}
    <img src={$$restProps.src} {...$$restProps} alt={alt} class="WuiAvatar__img"  />
  {:else if alt}
    <Text variant="title" size={size}>{alt[0].toUpperCase()}</Text>
  {:else if !$$slots.default}
    <Icon>person</Icon>
  {:else}
    <Text variant="title" size={size}><slot /></Text>
  {/if}
</Col>

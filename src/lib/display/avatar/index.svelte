<script context="module" lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import type { AnchorProps } from '$lib/buttons';
  export interface AvatarProps extends HTMLImgAttributes {
    src?: string
    type?: 'circle' | 'square'
    size?: 'small' | 'medium' | 'large',
    for?: AnchorProps['for']
  }
</script>

<script lang="ts">
  import { Anchor } from '$lib/buttons';
	interface $$Props extends AvatarProps {}

  let size: $$Props['size'] = 'medium';
  let type: $$Props['type'] = 'circle';
</script>

<Anchor appearance="none" class="cs-avatar {type} {size} {$$restProps.class}" {...$$restProps} on:*>
  {#if $$restProps.src}
    <img src={$$restProps.src} alt={$$restProps.alt} width={40} height={40} class="cs-avatar-image"  />
  {:else}
    <span class="cs-avatar-initials"><slot /></span>
  {/if}
</Anchor>

<style>
  @import './style.css';
</style>

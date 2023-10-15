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

<Anchor appearance="none" class={ `cs-avatar ${type} ${size} ${$$restProps.class}`} {...$$restProps} on:*>
  {#if $$restProps.src}
    <img src={$$restProps.src} alt={$$restProps.alt} width={40} height={40} class="cs-avatar-image"  />
  {:else}
    <span class="cs-avatar-initials"><slot /></span>
  {/if}
</Anchor>

<style lang="scss">
  .cs-avatar {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    border: 0.5px solid var(--color-outline);
    flex: 0 0 auto;

    &:hover {
      outline: 2px solid var(--color-selection-container);
    }

    &.small {
      height: 30px;
      width: 30px;
      font-size: 11px;
    }
    &.medium {
      height: var(--button-height);
      width: var(--button-height);
    }
    &.large {
      height: 60px;
      width: 60px;
      font-size: 18px;
    }

    &.square {
      border-radius: var(--border-radius);
    }
    &.circle {
      border-radius: 50%;
    }

    .cs-avatar-image {
      border-radius: inherit;
    }
  }
</style>
<script context="module" lang="ts">
  import type { BaseButtonProps } from './BaseButton.svelte';
  import type { ClickableProps } from './Clickable.svelte';
  import type { IconProps } from '$lib/display';

  export interface NoneButtonProps extends ClickableProps {
    appearance: 'none';
  }

  export interface PrimaryButtonProps extends BaseButtonProps {
    appearance?: 'primary';
  }

  export interface SecondaryButtonProps extends BaseButtonProps {
    appearance: 'secondary';
  }

  export interface IconButtonProps extends Omit<ClickableProps, 'class' | 'color'>, IconProps {
    name: IconProps['name'];
    color?: IconProps['color'];
    size?: IconProps['size'];
    appearance: 'icon';
    class?: string;
  }

  export interface TextButtonProps extends ClickableProps {
    appearance: 'text';
  }

  export type ButtonProps =
    | PrimaryButtonProps
    | SecondaryButtonProps
    | IconButtonProps
    | TextButtonProps
    | NoneButtonProps;
</script>

<script lang="ts">
  import BaseButton from './BaseButton.svelte';
  import Clickable from './Clickable.svelte';
  import { Icon } from '$lib/display';

  type $$Props = ButtonProps;

  export let appearance: $$Props['appearance'] = 'primary';
</script>

{#if appearance == 'primary'}
  <BaseButton {...$$restProps} class="button-primary {$$restProps.class || ''}" on:*>
    <slot />
  </BaseButton>
{:else if appearance == 'secondary'}
  <BaseButton {...$$restProps} class="button-secondary {$$restProps.class || ''}" on:*>
    <slot />
  </BaseButton>
{:else if appearance == 'icon'}
  <Clickable {...$$restProps} class="button-icon {$$restProps.class || ''}" on:*>
    <Icon name={$$restProps.name} fill={$$restProps.fill} size={$$restProps.size || 24} />
  </Clickable>
{:else if appearance == 'text'}
  <Clickable {...$$restProps} class="button-text {$$restProps.class || ''}" on:*>
    <slot />
  </Clickable>
{:else if appearance == 'none'}
  <Clickable {...$$restProps} class="{$$restProps.class || ''}" on:*>
    <slot />
  </Clickable>
{/if}

<style lang="scss" module>
  .button-primary {
    background-color: var(--color-primary);
    color: var(--color-on-primary);

    &:hover {
      opacity: 0.9;
      transition: opacity 0.2s ease-in-out;
    }
  }

  .button-icon {
    border-radius: 50%;
    color: var(--color-on-surface-variant);
    width: var(--button-height) !important;
    height: var(--button-height) !important;

    &:hover {
      background-color: var(--color-hover);
      color: var(--color-on-surface);
    }
  }

  .button-secondary {
    background-color: var(--color-primary-container);
    color: var(--color-on-primary-container);

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-on-primary);
      transition: background-color 0.2s, color 0.2s;
    }
  }

  .button-text {
    &:hover {
      color: var(--color-primary);
      opacity: 1;
    }
  }
</style>


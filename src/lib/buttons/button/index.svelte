<script context="module" lang="ts">
  import type { BaseButtonProps } from './base-button.svelte';
  import type { ClickableProps } from '../clickable/index.svelte';
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
  import BaseButton from './base-button.svelte';
  import Clickable from '../clickable/index.svelte';
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

<style>
  @import './style.scss';
</style>

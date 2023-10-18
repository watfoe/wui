<script context="module" lang="ts">
  import type { ClickableProps } from './Clickable.svelte';
  import type { IconProps } from '$lib/display';

  export interface BaseButtonProps extends ClickableProps {
    'icon-name'?: IconProps['name'];
    'icon-fill'?: IconProps['fill'];
    'icon-class'?: IconProps['class'];
  }
</script>

<script lang="ts">
  import Clickable from './Clickable.svelte';
  import {Icon} from '$lib/display';

  interface $$Props extends BaseButtonProps {}
</script>


<Clickable direction="row" {...$$restProps} class="base-button {$$restProps.class || ''}" on:*>
  {#if $$restProps['icon-name']}
    <Icon
      name={$$restProps['icon-name']}
      fill={$$restProps['icon-fill']}
      class="{$$restProps['icon-class'] || ''}"
    />
  {/if}
  <slot />
</Clickable>

<style lang="scss" module>
  .base-button {
    border: none;
    outline: none;
    border-radius: var(--border-radius);
    height: var(--button-height);
    width: auto;
    padding: 0 13px;
    white-space: nowrap;
  }
</style>

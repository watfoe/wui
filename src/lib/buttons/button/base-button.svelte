<script context="module" lang="ts">
  import type { ClickableProps } from '../clickable/index.svelte';
  import type { IconProps } from '$lib/display';

  export interface BaseButtonProps extends ClickableProps {
    'iconname'?: string;
    'iconfill'?: IconProps['fill'];
    'iconclass'?: IconProps['class'];
  }
</script>

<script lang="ts">
  import Clickable from '../clickable/index.svelte';
  import {Icon} from '$lib/display';

  interface $$Props extends BaseButtonProps {}
</script>


<Clickable direction="row" {...$$restProps} class="Wui-base-button {$$restProps.class || ''}" on:*>
  {#if $$restProps['iconname']}
    <Icon
      fill={$$restProps['iconfill']}
      class="{$$restProps['iconclass'] || ''}"
      size="sm"
    >{$$restProps['iconname']}</Icon>
  {/if}
  <slot />
</Clickable>

<style>
  @import './style.css';
</style>

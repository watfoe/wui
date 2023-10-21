<script context="module" lang="ts">
  import type { ClickableProps } from '../clickable/index.svelte';
  import type { IconProps } from '$lib/display';

  export interface BaseButtonProps extends ClickableProps {
    'iconname'?: IconProps['name'];
    'iconfill'?: IconProps['fill'];
    'iconclass'?: IconProps['class'];
  }
</script>

<script lang="ts">
  import Clickable from '../clickable/index.svelte';
  import {Icon} from '$lib/display';

  interface $$Props extends BaseButtonProps {}
</script>


<Clickable direction="row" {...$$restProps} class="cs-base-button {$$restProps.class || ''}" on:*>
  {#if $$restProps['iconname']}
    <Icon
      name={$$restProps['iconname']}
      fill={$$restProps['iconfill']}
      class="{$$restProps['iconclass'] || ''}"
    />
  {/if}
  <slot />
</Clickable>

<style>
  @import './style.css';
</style>

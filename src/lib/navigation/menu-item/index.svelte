<script lang="ts">
  import { Icon, type AvatarProps } from '$lib/display';
  import { Row } from '$lib/layout';

  interface $$Props {
    avatar?: AvatarProps;
    icon?: string;
  }

  export let icon: $$Props['icon'] = undefined
</script>


<Row align="center" justify="flex-start" class="cs-menu-item">
  {#if $$slots.avatar}
    <slot name="avatar"></slot>
  {:else if icon}
      <Icon name={icon} size={20} class="cs-menu-item-icon" />
  {/if}

  <slot />
</Row>

<style>
  @import './style.scss';
</style>

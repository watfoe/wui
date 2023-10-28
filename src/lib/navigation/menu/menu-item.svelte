<script lang="ts">
  import './style.css';
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
      <Icon class="cs-menu-item-icon">{name}</Icon>
  {/if}

  <slot />
</Row>

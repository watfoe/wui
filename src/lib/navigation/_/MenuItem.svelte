<script context="module" lang="ts">
  import type {AvatarProps, IconProps} from '$lib/display';

  export interface MenuItemProps {
    avatar?: AvatarProps;
    icon?: IconProps;
  }
</script>

<script lang="ts">
  import { Icon, Avatar } from '$lib/display';
  import { Row } from '$lib/layout';

  interface $$Props extends MenuItemProps {}
</script>


<Row align="center" justify="flex-start" class="cs-menu-item">
  {#if $$slots.avatar}
    <slot></slot>
  {:else if $$slots.icon}
      <Icon {...icon} size={20} className="cs-menu-item-icon" />
  {/if}
  <slot />
</Row>

<style lang="scss" module>
  .cs-menu-item {
    border-radius: var(--border-radius);
    min-height: 32px;
    padding: var(--space-xxs) 0;
    width: 100%;

    & + & {
      margin-top: var(--space-sm);
    }

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .cs-menu-item-avatar {
      margin: 0 var(--space-sm) 0 0;
    }

    .cs-menu-item-icon {
      color: var(--color-on-surface-variant);
      width: 30px;
      margin-right: var(--space-sm);
      text-align: center;
    }

    &:hover {
      background-color: var(--color-hover);
      color: var(--color-on-surface);
      cursor: pointer;

      .--icon {
        color: var(--color-on-surface);
      }
    }
  }
</style>
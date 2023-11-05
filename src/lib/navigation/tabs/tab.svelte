<script lang="ts">
  import { Button } from '$lib/buttons';

  interface $$Props {
    active?: boolean;
    icon?: string;
    class?: string;
  }

  export let active: $$Props['active'] = false;
  export let icon: $$Props['icon'] = undefined;

  function select(e: CustomEvent) {
    active = e.detail.active;
  }
</script>

<Button
  role="tab"
  aria-selected={active}
  tabindex={active ? 0 : -1}
  variant={active ? 'soft' : 'plain'}
  color={active ? 'primary' : 'neutral'}
  size="sm"
  icon={icon}
  class="WuiTab"
  on:select={select}
>
  <slot />
</Button>

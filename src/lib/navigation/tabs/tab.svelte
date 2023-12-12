<script lang="ts">
  import { Button, type ButtonProps } from '$lib/button';

  interface $$Props extends ButtonProps {
    active?: boolean;
  }

  export let active: $$Props['active'] = false;

  function select(e: CustomEvent) {
    active = e.detail.active;
  }
</script>

<Button
  {...$$restProps}
  role="tab"
  aria-selected={active}
  tabindex={active ? 0 : -1}
  variant={active ? 'soft' : 'plain'}
  size="sm"
  color={active ? 'primary' : 'neutral'}
  class="WuiTab"
  on:select={select}
  bold={false}
>
  <slot />
</Button>

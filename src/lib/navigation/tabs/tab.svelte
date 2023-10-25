<script lang="ts">
  import { Button } from '$lib/buttons';

  interface $$Props {
    active?: boolean;
    icon?: string;
    class?: string;
  }

  export let active: $$Props['active'] = false;
  export let icon: $$Props['icon'] = undefined;
</script>

<Button role="tab" appearance="secondary" iconname={icon} class="cs-tab {$$restProps.class} {active ? 'active' : ''}">
  <slot />
</Button>

<style>
  @import './style.css';
</style>

<script lang="ts">
  import { Button } from '$lib/buttons';

  interface $$Props {
    active?: boolean;
    icon?: string;
  }

  export let active: $$Props['active'] = false;
  export let icon: $$Props['icon'] = undefined;
</script>

<Button appearance="secondary" iconname={icon} class="cs-tab {$$restProps.class} {active ? 'active' : ''}">
  <slot />
</Button>

<style>
  @import './style.css';
</style>

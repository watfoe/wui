<script lang="ts">
  import './style.css';
	import { Button, type ButtonProps } from '$lib/button';

  interface $$Props extends ButtonProps {
    // avatar?: AvatarProps;
    selected?: boolean;
  }

  export let selected: boolean = false;
</script>


<Button
  variant={selected ? 'soft' : 'plain'}
  color={selected ? 'primary' : 'neutral'}
  class="WuiMenuItem"
  {...$$restProps}
  role="menuitem">
  <slot />
</Button>

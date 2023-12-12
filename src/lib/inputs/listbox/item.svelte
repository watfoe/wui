<script lang="ts" context="module">
  import type { ButtonProps } from "$lib/button";

  export interface ListItemProps extends ButtonProps {
    value?: string;
    selected?: boolean;
    element?: HTMLButtonElement;
    role?: 'listitem' | 'option' | 'menuitem';
  };
</script>

<script lang="ts">
	import { Button } from "$lib/button";
	import { onMount } from "svelte";

  interface $$Props extends ListItemProps {}

  export let value: $$Props['value'] = undefined;
  export let selected: $$Props['selected'] = false;
  export let element: $$Props['element'] = undefined;
  export let role: $$Props['role'] = 'listitem';

  onMount(() => {
    if (selected && value) {
      // Without the timeout, the event is dispatched but the listener has not been registered yet.
      setTimeout(() => {
        dispatch();
      }, 0);
    }
  });

  function select() {
    if (!selected) {
      selected = true;
      dispatch();
    }
  }

  function dispatch() {
    element?.dispatchEvent(new CustomEvent('select', {
      detail: { item: element, value }
    }));
  }
</script>

<Button
  {...$$restProps}
  bind:element={element}
  {role}
  aria-selected="{selected}"
  variant={selected ? 'soft' : 'plain'}
  color={selected ? 'primary' : 'neutral'}
  justify="flex-start"
  width="full"
  bold={false}
  class="WuiListBox__listitem"
  on:click={select}
>
  <slot/>
</Button>

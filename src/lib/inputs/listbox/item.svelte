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

    // Keyboard accessibility
    element?.addEventListener('keydown', (e: KeyboardEvent) => {
      const {key} = e;

      if (key === 'ArrowDown') {
        e.preventDefault();

        // If it has focus, move to the next item
        if (element === document.activeElement) {
          const next = element.nextElementSibling as HTMLButtonElement;

          if (next) {
            next.focus();
          } else if (element.previousElementSibling) {
            const first = element.parentElement?.firstElementChild as HTMLButtonElement;
            first?.focus();
          }
        }
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        // If it has focus, move to the next item
        if (element === document.activeElement) {
          const previous = element.previousElementSibling as HTMLButtonElement;

          if (previous) {
            previous.focus();
          } else if (element.nextElementSibling) {
            const last = element.parentElement?.lastElementChild as HTMLButtonElement;
            last?.focus();
          }
        }
      } else if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        element?.click();
      }
    });
  });

  function select() {
    if (!selected) {
      selected = true;
      dispatch();
    }
  }

  function deselect() {
    if (selected) {
      selected = false;
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
  type="button"
  aria-selected="{selected}"
  variant={selected ? 'soft' : 'plain'}
  color={selected ? 'primary' : 'neutral'}
  justify="flex-start"
  width="full"
  bold={false}
  class="WuiListBox__listitem"
  on:click={select}
  on:deselect={deselect}
>
  <slot/>
</Button>

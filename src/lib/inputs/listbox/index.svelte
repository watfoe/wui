<script lang="ts">
  import './style.css';
  import { Col } from '$lib/layout';
	import { onMount } from 'svelte';
	import type { ColProps } from '$lib/layout/col/index.svelte';

  interface $$Props extends ColProps {
    class?: string;
    style?: string;
    selected?: boolean;
    variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    element?: HTMLDivElement;
    multiple?: boolean;
  }

  export let element: $$Props['element'] = undefined;
  export let multiple: $$Props['multiple'] = false;

  let selections = [] as HTMLButtonElement[];
  let values = [] as string[];

  onMount(() => {
    const children = element?.children || [];

    // Filter out any elements that are not 'item' elements or a divider.
    for (let i = 0; i < children.length; i++) {
      const child = element?.children[i];
      const role = child?.getAttribute('role');
      if (role !== 'option' && role !== 'listitem' && role !== 'menuitem' && role !== 'divider') {
        child?.remove();
        continue;
      }

      if (role !== 'divider' && child?.nodeName === 'BUTTON') {
        // @ts-ignore
        child.addEventListener('select', (e: CustomEvent) => {
          const {value, item} = e.detail;

          if (multiple) {
            if (values.includes(value)) {
              values = values.filter(v => v !== value);
              selections = selections.filter(s => s !== item);
            } else {
              values.push(value);
              selections.push(item);
            }
          } else {
            values = [value];
            selections = [item];
          }

          element?.dispatchEvent(new CustomEvent('select', {
            detail: { values, selections }
          }));
        });
      }
    }
  });
</script>

<Col
  bind:element={element}
  role="{$$restProps.role || 'listbox'}"
  aria-label="{$$restProps.label || 'Select an option'}"
  class="WuiListBox {$$restProps.class || ''}"
  style="{$$restProps.style || ''}"
>
  <slot />
</Col>

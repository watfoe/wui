<script lang="ts">
  import './style.css';
  import { Backdrop } from '$lib/feedback';
	import { Button } from '$lib/button';
  import { Listbox } from '$lib/inputs';
	import { onMount } from 'svelte';
	import { Col } from '$lib/layout';

  interface $$Props {
    class?: string;
    style?: string;
    value?: string;
    selected?: boolean;
    multiple?: boolean;
    placeholder?: string;
    label?: string;
    description?: string;
    hidden?: boolean;
    name?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
  }

  const id = Math.random().toString(36).substring(2, 9);
  let listbox: HTMLDivElement;
  let selections = [] as HTMLButtonElement[];

  export let value: $$Props['value'] = undefined;
  export let selected: $$Props['selected'] = false;
  export let multiple: $$Props['multiple'] = false;
  export let placeholder: $$Props['placeholder'] = undefined;
  export let label: $$Props['label'] = undefined;
  export let description: $$Props['description'] = undefined;
  export let hidden: $$Props['hidden'] = false;
  export let name: $$Props['name'] = undefined;
  export let variant: $$Props['variant'] = 'outline';
  export let color: $$Props['color'] = 'neutral';
  export let size: $$Props['size'] = 'md';

  onMount(() => {
    listbox?.addEventListener('select', (e: CustomEvent) => {
      const {selections: _selections, values} = e.detail;
      value = values.join(', ');
      selections = _selections;
    });
  });

  let rect = {
    top: 0,
    left: 0,
    width: 0,
  };

  let listDomRect = {} as DOMRect;

  function open(e: CustomEvent) {
    const { innerHeight } = window;
    const anchor = e.detail.anchor as HTMLElement;

    if (anchor) {
      let {top, left, width, height} = anchor.getBoundingClientRect();

      // Preserve the first domrect of the menu, translate() will change the
      // position of the x and y properties and we need to use the original values.
      if (!listDomRect.width) {
        listDomRect = listbox.getBoundingClientRect();
      }

      // We are using transform: translate() to position the menu which
      // takes in to account the menu's x and y position.
      left -= listDomRect.x;
      top -= listDomRect.y;

      if (top + height + listDomRect.height > innerHeight) {
        top = top - listDomRect.height - height;
      } else {
        top += height + 1;
      }

      rect = {
        top,
        left,
        width,
      };
    }
  }
</script>

<fieldset class="WuiSelect__root WuiSelect--{color} {$$restProps.class}" hidden={hidden}>
  {#if label && !hidden}
    <label for={id} description={description}>{label}</label>
  {/if}

  <Col align="flex-start" justify="flex-start" class="WuiSelect__root__body">
    <Button
      {...$$props}
      role="combobox"
      aria-expanded="false"
      anchorfor={id}
      {variant}
      {color}
      {size}
      bold={false}
      justify="space-between"
      width="full"
      suffix="keyboard_arrow_down"
      class="WuiSelect__combobox"
    >
      {#if selections.length > 0}
        {#each selections as selection}
          {selection.textContent}
        {/each}
      {:else if placeholder}
        <span class="WuiSelect__combobox__placeholder">{placeholder}</span>
      {:else}
        <span class="WuiSelect__combobox__placeholder">Select an option</span>
      {/if}
    </Button>
    <input tabindex="-1" aria-hidden="true" {name} value={$$props.value} class="WuiSelect__hidden_input">
  </Col>
</fieldset>

<Backdrop id={id} on:open={open} transparent>
  <Listbox
    bind:element={listbox}
    role="listbox"
    aria-label="List of options"
    class="WuiSelect__listbox"
    style="--WuiSelect-posX:{rect.left}px;--WuiSelect-posY:{rect.top}px;--WuiSelect-width:{rect.width}px"
    {multiple}
  >
    <slot />
  </Listbox>
</Backdrop>

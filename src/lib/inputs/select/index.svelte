<script lang="ts">
  import './style.css';
  import { Backdrop } from '$lib/feedback';
	import { Button } from '$lib/button';
  import { Listbox, Label } from '$lib/inputs';
	import { onMount } from 'svelte';
	import { Col } from '$lib/layout';
	import { Icon } from '$lib/display';
	import { validate, type ValidationError } from '../_common_';

  interface $$Props {
    class?: string;
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
    description?: string;
    element?: HTMLInputElement;
    error?: ValidationError;
    hidden?: boolean;
    id?: string;
    label?: string;
    multiple?: boolean;
    name?: string;
    placeholder?: string;
    required?: boolean;
    size?: 'sm' | 'md' | 'lg';
    style?: string;
    validateon?: 'change' | 'blur' | 'submit';
    value?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
  }

  let opened = false;
  let rules = {} as Record<string, any>;
  let fieldset: HTMLFieldSetElement;
  let combobox: HTMLButtonElement;
  let listbox: HTMLDivElement;
  let selections = [] as HTMLButtonElement[];

  // Rearange the props in alphabetical order
  export let color: $$Props['color'] = 'neutral';
  export let description: $$Props['description'] = undefined;
  export let element: $$Props['element'] = undefined;
  export let error: $$Props['error'] = undefined;
  export let hidden: $$Props['hidden'] = false;
  export let id: $$Props['id'] = Math.random().toString(36).substring(2, 9);
  export let label: $$Props['label'] = undefined;
  export let multiple: $$Props['multiple'] = false;
  export let name: $$Props['name'] = undefined;
  export let placeholder: $$Props['placeholder'] = undefined;
  export let required: $$Props['required'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let style: $$Props['style'] = undefined;
  export let value: $$Props['value'] = '';
  export let validateon: $$Props['validateon'] = 'submit';
  export let variant: $$Props['variant'] = 'outline';

  $: if (error || !error) {
    element?.setCustomValidity(error === undefined ? '' : error?.message);
  };

  onMount(() => {
    if (required && validateon === 'submit') {
      // Get the form element that this input is in
      const form = element?.closest('form');
      form?.addEventListener('submit', () => {
        _validate(value!);
      });
    }

    // @ts-ignore
    listbox?.addEventListener('select', (e: CustomEvent) => {
      const {selections: _selections, values} = e.detail;
      value = values.join(', ');
      selections = _selections;

      // Dispatching the event from the input element is best
      // Any listeners on the fieldset will be able to listen for the event since
      // it bubbles up.
      element?.dispatchEvent(new Event('change', {bubbles: true}));

      if (error) {
        _validate(value!);
      }
    });

    // Keyboard accessibility
    combobox?.addEventListener('keydown', (e: KeyboardEvent) => {
      const {key} = e;
      const {length} = selections;

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();
        combobox?.click();
      } else if (key === 'Backspace' && length > 0) {
        e.preventDefault();
        selections[length - 1].click();
      }
    });
  });

  function _validate(_value: string) {
    try {
      validate(_value, {required: 'Please select an option'});
      error = undefined;
    } catch (e) {
      error = e as ValidationError;
    }
  }

  function blur(e: CustomEvent) {
    // Wait for the backdrop to close before validating
    setTimeout(() => {
      if (!opened) {
        if (required && validateon === 'blur') {
          _validate(value!);
        }
      }
    }, 0);
  }

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

      const lowerY = top + height + listDomRect.height;
      const upperY = top - listDomRect.height;

      if (lowerY > innerHeight) {
        if (upperY > 0) {
          top -= listDomRect.height;
        } else {
          if (listDomRect.height > innerHeight) {
            top = 0;
          } else {
            top = innerHeight - listDomRect.height;
          }
        }
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

<fieldset
  bind:this={fieldset}
  hidden={hidden}
  class="WuiSelect__root WuiSelect--{color} WuiSelect--{variant} {$$restProps.class}"
  on:blur={blur}
  on:*
>
  {#if label && $$slots.description && !hidden}
    <Label for={id} {description}>
      {label}
      <slot name="description" slot="description" />
    </Label>
    {:else if label && !hidden}
    <Label for={id} {description}>
      {label}
    </Label>
  {/if}

  <Col align="flex-start" justify="flex-start" class="WuiSelect__root__body">
    <Button
      {...$$restProps}
      bind:element={combobox}
      role="combobox"
      type="button"
      aria-expanded="false"
      anchorfor={id}
      color={error ? 'danger' : opened ? 'primary' : color}
      {variant}
      {size}
      bold={false}
      justify="space-between"
      width="full"
      class="WuiSelect__combobox {opened ? 'WuiSelect__combobox--opened' : ''}"
      on:blur={blur}
    >
      {#if selections.length > 0}
        {#each selections as selection}
          <span class="WuiSelect__combobox__value">{selection.textContent}</span>
        {/each}
      {:else if placeholder}
        <span class="WuiSelect__combobox__placeholder">{placeholder}</span>
      {:else}
        <span class="WuiSelect__combobox__placeholder">Select an option</span>
      {/if}

      <Icon slot="suffix" class="WuiSelect__combobox__icon">
        keyboard_arrow_down
      </Icon>
    </Button>

    <input
      bind:this={element}
      tabindex="-1"
      aria-hidden="true"
      {name}
      {value}
      style="clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;width:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;left:50%;bottom:0"
    />
  </Col>
</fieldset>

<Backdrop id={id} on:open={open} bind:opened={opened} transparent>
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

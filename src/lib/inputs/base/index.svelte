<script context="module" lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { BaseProps } from '../_common_';

  export type BaseInputProps = BaseProps<Omit<HTMLInputAttributes, 'prefix' | 'size'>>;
</script>

<script lang="ts">
  import './style.css';
  import { Row } from '$lib/layout';

  import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib/display';
	import { onMount } from 'svelte';

  type $$Props = BaseInputProps;

  export let element: $$Props['element'] = undefined;
  export let error: $$Props['error'] = undefined;
  export let masks: $$Props['masks'] = undefined;
  export let prefix: $$Props['prefix'] = undefined;
  export let required: $$Props['required'] = undefined;
  export let rules: $$Props['rules'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let suffix: $$Props['suffix'] = undefined;
  export let validateon: $$Props['validateon'] = 'blur';
  export let value: $$Props['value'] = '';
  export let variant: $$Props['variant'] = 'outline';

  $: if (error || !error) {
    element?.setCustomValidity(error === undefined ? '' : error?.message);
  };

  onMount(() => {
    if (required && !rules?.required) {
      rules = rules || {};
      rules.required = true;
    }

    if (rules && validateon === 'submit') {
      // Get the form element that this input is in
      const form = element?.closest('form');
      form?.addEventListener('submit', () => {
        _validate(element?.value!);
      });
    }
  });

  function _validate(_value: string) {
    try {
      validate(_value, rules!);
      error = undefined;
    } catch (e) {
      error = e as ValidationError;
    }
  }

  function change(e: CustomEvent) {
    let _value = (e.target as HTMLInputElement)?.value;

    if (masks) {
      _value = mask(_value, masks) || '';
      value = _value
    }

    if (rules && validateon === 'change') {
      _validate(_value);
    }
  }

  function blur(e: CustomEvent) {
    if (rules && validateon === 'blur') {
      _validate((e.target as HTMLInputElement)?.value);
    }
  }
</script>

<Row class="WuiInput__field-cont">
  {#if $$slots.prefix}
    <div class="WuiInput__prefix">
      <slot name="prefix" />
    </div>
  {:else if prefix}
    <div class="WuiInput__prefix">
      <Icon>{prefix}</Icon>
    </div>
  {/if}

  <input
    dir="ltr"
    bind:this={element}
    {...$$restProps}
    class="WuiInput WuiInput--{variant} WuiInput--{size} {prefix ? 'WuiInput--prefixed' : ''} {suffix ? 'WuiInput--suffixed' : ''} {$$restProps.class || ''}"
    on:input={change}
    on:blur={blur}
    bind:value={value}
    on:validate on:input on:change on:click on:dblclick on:blur on:focus
  />

  {#if $$slots.suffix}
    <div class="WuiInput__suffix">
      <slot name="suffix" />
    </div>
  {:else if suffix}
    <Icon class="WuiInput__suffix">{suffix}</Icon>
  {/if}
</Row>

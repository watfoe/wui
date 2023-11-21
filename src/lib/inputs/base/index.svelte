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

  let input: HTMLInputElement;
  let value: string | null = null;
  let error: ValidationError | null = null;

  export let rules: $$Props['rules'] = undefined;
  export let masks: $$Props['masks'] = undefined;
  export let prefix: $$Props['prefix'] = undefined;
  export let suffix: $$Props['suffix'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let validateon: $$Props['validateon'] = 'blur';
  export let required: $$Props['required'] = undefined;

  onMount(() => {
    if (required && !rules?.required) {
      rules = rules || {};
      rules.required = true;
    }
  });

  export const clearError = () => {
    error = null;
    input?.setCustomValidity('');
  };

  function _validate(_value: string) {
    try {
      validate(_value, rules!);
      clearError();
      input.dispatchEvent(new CustomEvent('validate', {
        detail: { value }
      }));
    } catch (e) {
      error = e as ValidationError;
      input?.setCustomValidity(error.message);
      input?.dispatchEvent(new CustomEvent('validate', {
        detail: { error }
      }));
    }
  }

  function change(e: CustomEvent) {
    let _value = (e.target as HTMLInputElement)?.value;
    if (masks) {
      _value = mask(_value, masks) || '';
    }

    value = _value

    if (rules && validateon === 'change') {
      _validate(_value);
    }
  }

  function blur(e: CustomEvent) {
    let _value = (e.target as HTMLInputElement)?.value;
    if (rules && validateon === 'blur') {
      _validate(_value);
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
    bind:this={input}
    {...$$restProps}
    class="WuiInput WuiInput--{size} {prefix ? 'WuiInput--prefixed' : ''} {suffix ? 'WuiInput--suffixed' : ''}"
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

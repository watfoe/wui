<script context="module" lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { BaseProps } from '../_common_';

  export type BaseInputProps = BaseProps<Omit<HTMLInputAttributes, 'prefix'>>;
</script>

<script lang="ts">
  import { Row } from '$lib/layout';

  import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib/display';

  type $$Props = BaseInputProps;

  let input: HTMLInputElement;
  let value: string | null = null;
  let error: ValidationError | null = null;

  export let rules: $$Props['rules'] = undefined;
  export let masks: $$Props['masks'] = undefined;
  export let prefix: $$Props['prefix'] = undefined;
  export let suffix: $$Props['suffix'] = undefined;
  export let validateon: $$Props['validateon'] = 'blur';
  // Capture the required prop so that we can add it to the rules
  export let required: $$Props['required'] = false;


  export const clearError = () => {
    error = null;
  };

  function _validate(_value: string) {
    try {
      if (required && !rules?.required) {
        rules!.required = true;
      }
      validate(_value, rules!);
      clearError();
      input.dispatchEvent(new CustomEvent('validate', {
        detail: { value }
      }));
    } catch (e) {
      error = e as ValidationError;
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

<Row class="WuiInput-field-cont">
  {#if $$slots.prefix}
    <div class="input-prefix">
      <slot name="prefix" />
    </div>
  {:else if prefix}
    <Icon class="input-prefix">{prefix}</Icon>
  {/if}

  <input
    dir="ltr"
    bind:this={input}
    {...$$restProps}
    class="WuiInput-field {error ? 'errored' : ''} {prefix ? 'prefixed' : ''} {suffix ? 'suffixed' : ''}"
    on:input={change}
    on:blur={blur}
    bind:value={value}
    on:validate on:input on:change on:click on:dblclick on:blur on:focus
  />

  {#if $$slots.suffix}
    <div class="input-suffix">
      <slot name="suffix" />
    </div>
  {:else if suffix}
    <Icon class="input-suffix">{suffix}</Icon>
  {/if}
</Row>

<style>
  @import './style.css';
</style>

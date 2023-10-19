<script context="module" lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { BaseProps } from '../_common_';

  export type BaseInputProps = BaseProps<HTMLTextareaAttributes>;
</script>

<script lang="ts">
  import { Anchor } from '$lib/buttons';
  import { Row } from '$lib/layout';

  import { validate, mask, ValidationError } from '../_common_';

  type $$Props = BaseInputProps;

  let textarea: HTMLTextAreaElement;
  let value: string | null = null;
  let error: ValidationError | null;
  let rules: $$Props['rules'] = undefined;
  let masks: $$Props['masks'] = undefined;
  let prefix: $$Props['prefix'] = undefined;
  let suffix: $$Props['suffix'] = undefined;
  let validateon: $$Props['validateon'] = 'blur';

  export const clearError = () => {
    error = null;
  };

  export const _validateField = (_value: string) => {
    try {
      validate(_value, rules!);
      clearError();
      textarea.dispatchEvent(new CustomEvent('validate', {
        detail: { value }
      }));
    } catch (e) {
      error = e as ValidationError;
      textarea.dispatchEvent(new CustomEvent('validate', {
        detail: { error }
      }));
    }
  }

  function handleChange(e: CustomEvent<HTMLTextAreaElement>) {
    let _value = e.target?.value;
    if (masks) {
      _value = mask(_value, masks) || '';
    }

    value = _value

    if (rules && validateon === 'change') {
      _validateField(_value);
    }
  }

  function handleBlur(e) {
    let _value = e.target?.value;
    if (rules && validateon === 'blur') {
      _validateField(_value);
    }
  }

  const handleAnchorClick = () => {
    // Prevent the input from losing focus or focus it
    textarea.focus();
  }
</script>

<Row class="cs-input-base-cont">
  {#if prefix}
    <Anchor {...$$restProps.prefix} on:click={handleAnchorClick} class={`cs-input--prefix`} />
  {/if}
  <textarea
    dir="ltr"
    on:change={handleChange}
    on:blur={handleBlur}
    bind:value={value}
    bind:this={textarea}
    {...$$restProps}
    class="cs-input-base {$$restProps.class}"
    on:validate
    on:*
  />
  {#if suffix}
    <Anchor {...$$restProps.suffix} on:click={handleAnchorClick} class={`cs-input--postfix`} />
  {/if}
</Row>

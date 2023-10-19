<script context="module" lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { BaseProps } from './_common_';

  export type BaseInputProps = BaseProps<Omit<HTMLInputAttributes, 'prefix'>>;
</script>

<script lang="ts">
  import { Anchor } from '$lib/buttons';
  import { Row } from '$lib/layout';
  import { onMount } from "svelte";

  import { validate, mask, ValidationError } from './_common_';

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

  const handleAnchorClick = () => {
    // Prevent the input from losing focus or focus it
    input.focus();
  }
</script>

<Row class="input-cont">
  {#if prefix}
    <Anchor appearance="icon" {...prefix} on:click={handleAnchorClick} class="input-prefix" on:* />
  {/if}
  <input
    dir="ltr"
    bind:this={input}
    {...$$restProps}
    class="input {error ? 'errored' : ''} {prefix ? 'prefixed' : ''} {suffix ? 'suffixed' : ''}"
    on:input={change}
    on:blur={blur}
    bind:value={value}
    on:validate on:input on:change on:click on:dblclick on:blur on:focus
  />
  {#if suffix}
    <Anchor appearance="icon" on:click={handleAnchorClick} {...suffix} class="input-suffix" on:* />
  {/if}
</Row>

<style lang="scss" module>
  .input-cont {
    width: 100% !important;
    position: relative !important;

    &.focused {
      border: 1.8px solid var(--color-primary);

      .input--prefix, .input--suffix {
        width: calc(var(--input-height) - (2*2.8px));
      }

      .input {
        padding: 0 var(--space-nm) 0 calc(var(--space-nm) - 3.8px) !important;
      }
    }
  }

  .input {
    border: 1.3px solid var(--color-hairline);
    border-radius: var(--border-radius);
    width: 100% !important;
    height: var(--input-height);
    // prevent the input margin from being overridden
    margin: 0 !important;
    outline: none !important;
    padding: 0 calc(var(--space-nm) - 0.8px) !important;

    &::placeholder {
      color: var(--color-on-surface-variant);
    }

    &:focus {
      border: 1.8px solid var(--color-primary);
      padding: 0 var(--space-nm) 0 calc(var(--space-nm) - 1.3px) !important;
    }

    &.errored {
      border: 1.8px solid var(--color-status-error) !important;
      padding: 0 var(--space-nm) 0 calc(var(--space-nm) - 1.3px) !important;
    }

    &.prefixed:focus {
      padding-left: calc(var(--space-xs) + var(--input-height) - 1.6px) !important;
    }

    &.suffixed:focus {
      padding-right: calc(var(--space-xs) + var(--input-height) - 1.6px) !important;
    }

    &.prefixed {
      padding-left: calc(var(--space-xs) + var(--input-height) - 1.3px) !important;
    }

    &.suffixed {
      padding-right: calc(var(--space-xs) + var(--input-height) - 1.3px) !important;
    }
  }

  .input-prefix, .input-suffix {
    border-radius: calc(var(--border-radius) - 1px);
    height: calc(100% - (1.3px * 2)) !important;
    width: calc(var(--input-height) - (2.3px * 2));
    position: absolute;
  }

  .input-prefix {
    left: 1.3px;
  }

  .input-suffix {
    right: 1.3px;
  }
</style>

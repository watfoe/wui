<script context="module" lang="ts">
  import type { BaseInputProps } from './BaseInput.svelte';
  export type InputProps = BaseInputProps & {
    label?: string;
    name?: string;
    description?: string;
    hidden?: boolean;
    type?:
        | 'date'
        | 'email'
        | 'name'
        | 'number'
        | 'password'
        | 'pin'
        | 'phone'
        | 'search'
        | 'text';
  };
</script>

<script lang="ts">
  import { Col } from '$lib/layout';
  import Label from './Label.svelte';
  import ErrorText from './ErrorText.svelte';
	import BaseInput from './BaseInput.svelte';
  import DateInput from './DateInput.svelte';
  import EmailInput from './EmailInput.svelte';
  import PasswordInput from './PasswordInput.svelte';
  import PhoneInput from './PhoneInput.svelte';
  import PinInput from './PinInput.svelte';
  import SearchInput from './SearchInput.svelte';
	import type { ValidationError } from '$lib/domains/_/phone';

  type $$Props = InputProps;

  let errored = false;
  let focused = false;

  export let description: $$Props['description'] = undefined;
  export let label: $$Props['label'] = undefined;
  // export let hidden: $$Props['hidden'] = false;
  export let type: $$Props['type'] = 'text';

  let error: string = '';

  function validate(e: CustomEvent) {
    const detail = e.detail;
    if (detail.error) {
      errored = true;
      error = errorToString(detail.error);
    } else {
      errored = false;
      error = '';
    }
  }

  function errorToString(error: ValidationError) {
    let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
    message = message.charAt(0).toUpperCase() + message.slice(1);
    return message;
  };

  function focus() {
    focused = true;
  }

  function blur() {
    focused = false;
  }
</script>

<Col align="flex-start" justify="flex-start" class="cs-input {$$restProps.class}">
  {#if label}
    <Label focused={focused} errored={errored} description={description}>{label}</Label>
  {/if}

  <Col align="flex-start" justify="flex-start" class="cs-input-body">
    {#if type === 'date'}
      <DateInput {...$$restProps} on:validate={validate} on:focus={focus} on:blur={blur}  on:* />
    {:else if type === 'email'}
      <EmailInput {...$$restProps} on:validate={validate} on:focus={focus} on:blur={blur} on:* />
    {:else if type === 'name'}
      <BaseInput {...$$restProps} autocomplete="name" autocapitalize="words" on:validate={validate} on:focus={focus} on:blur={blur}  on:* />
    {:else if type === 'password'}
      <PasswordInput secure {...$$restProps} on:validate={validate} on:focus={focus} on:blur={blur}  on:* />
    {:else if type === 'phone'}
      <PhoneInput {...$$restProps} on:validate={validate} on:focus={focus} on:blur={blur}  on:* />
    {:else if type === 'pin'}
      <PinInput {...$$restProps} on:validate={validate} on:focus={focus} on:blur={blur}  on:* />
    {:else if type === 'search'}
      <SearchInput {...$$restProps} on:validate={validate} on:focus={focus} on:blur={blur}  on:* />
    {:else}
      <BaseInput {...$$restProps} on:validate={validate} on:focus={focus} on:blur={blur} on:* />
    {/if}

    {#if errored}
      <ErrorText error={error} />
    {/if}
  </Col>
</Col>

<style module>
  .cs-input {
    width: 100%;
    /* This is to cater for the error text */
    padding-bottom: 4px;
  }

  .cs-input-body {
    width: 100% !important;
    position: relative;
  }
</style>
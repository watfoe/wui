<script context="module" lang="ts">
  import type { BaseInputProps } from '../base/index.svelte';
  export type InputProps = Omit<BaseInputProps, 'id'> & {
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
  import './style.css';
  import { Col } from '$lib/layout';
  import Label from '../label/index.svelte';
  import ErrorText from '../error/index.svelte';
	import BaseInput from '../base/index.svelte';
  import DateInput from '../date/index.svelte';
  import EmailInput from '../email/index.svelte';
  import PasswordInput from '../password/index.svelte';
  import PhoneInput from '../phone/index.svelte';
  import PinInput from '../pin/index.svelte';
  import SearchInput from '../search/index.svelte';
	import type { ValidationError } from '$lib/domains/_/phone';
	import { onMount } from 'svelte';

  type $$Props = InputProps;

  let errored = false;

  export let description: $$Props['description'] = undefined;
  export let label: $$Props['label'] = undefined;
  export let hidden: $$Props['hidden'] = undefined;
  export let type: $$Props['type'] = 'text';

  let id: string | undefined = undefined;
  let error: string = '';

  onMount(() => {
    id = Math.random().toString(36).substring(2, 15);
  });

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
</script>

<fieldset class="WuiInput__root {$$restProps.class}" hidden={hidden}>
  {#if label && !hidden}
    <Label for={id} description={description}>{label}</Label>
  {/if}

  <Col align="flex-start" justify="flex-start" class="WuiInput__root__body">
    {#if type === 'date'}
      <DateInput {...$$restProps} id={id} on:validate={validate} on:* />
    {:else if type === 'email'}
      <EmailInput {...$$restProps} id={id} on:validate={validate} on:* />
    {:else if type === 'name'}
      <BaseInput {...$$restProps} id={id} autocomplete="name" autocapitalize="words" on:validate={validate} on:* />
    {:else if type === 'password'}
      <PasswordInput secure {...$$restProps} id={id}  on:validate={validate} on:* />
    {:else if type === 'phone'}
      <PhoneInput {...$$restProps} id={id} on:validate={validate} on:* />
    {:else if type === 'pin'}
      <PinInput {...$$restProps} id={id} on:validate={validate} on:* />
    {:else if type === 'search'}
      <SearchInput {...$$restProps} id={id} on:validate={validate} on:* />
    {:else}
      <BaseInput {...$$restProps} id={id} on:validate={validate} on:* />
    {/if}

    {#if errored}
      <ErrorText error={error} />
    {/if}
  </Col>
</fieldset>

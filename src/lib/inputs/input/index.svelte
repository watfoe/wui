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

  type $$Props = InputProps;

  export let color: $$Props['color'] = 'neutral';
  export let description: $$Props['description'] = undefined;
  export let label: $$Props['label'] = undefined;
  export let hidden: $$Props['hidden'] = undefined;
  export let type: $$Props['type'] = 'text';
  export let error: $$Props['error'] = undefined;

  let id = Math.random().toString(36).substring(2, 15);
</script>

<fieldset class="WuiInput__root WuiInput--{color} {$$restProps.class}" hidden={hidden}>
  {#if label && !hidden}
    <Label for={id} description={description}>{label}</Label>
  {/if}

  <Col align="flex-start" justify="flex-start" class="WuiInput__root__body">
    {#if type === 'date'}
      <DateInput {...$$restProps} {id} {color} bind:error={error} on:* />
    {:else if type === 'email'}
      <EmailInput {...$$restProps} {id} {color} bind:error={error} on:* />
    {:else if type === 'name'}
      <BaseInput {...$$restProps} {id} {color} autocomplete="name" autocapitalize="words" bind:error={error} on:* />
    {:else if type === 'password'}
      <PasswordInput secure {...$$restProps} {id} {color}  bind:error={error} on:* />
    {:else if type === 'phone'}
      <PhoneInput {...$$restProps} {id} {color} bind:error={error} on:* />
    {:else if type === 'pin'}
      <PinInput {...$$restProps} {id} {color} bind:error={error} on:* />
    {:else if type === 'search'}
      <SearchInput {...$$restProps} {id} {color} bind:error={error} on:* />
    {:else}
      <BaseInput {...$$restProps} {id} {color} bind:error={error} on:* />
    {/if}

    {#if error}
      <ErrorText error={error} />
    {/if}
  </Col>
</fieldset>

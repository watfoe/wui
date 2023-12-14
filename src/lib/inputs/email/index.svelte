<script lang="ts">
	import BaseInput, { type BaseInputProps } from '../base/index.svelte';
  import { Email } from '$lib/domains'

  interface $$Props extends BaseInputProps {}

  export let element: $$Props['element'] = undefined;
  export let error: $$Props['error'] = undefined;
  export let value: $$Props['value'] = '';

  function rule(value: string) {
    return new Email(value);
  }
</script>

<BaseInput
  {...$$restProps}
  type="email"
  autocomplete="email"
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  rules={{
    rule,
    ...$$restProps.rules,
  }}
  bind:element={element}
  bind:error={error}
  bind:value={value}
  on:*
/>
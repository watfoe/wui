<script lang="ts">
	import BaseInput, { type BaseInputProps } from '../base/index.svelte';
  import { Phone } from '$lib/domains'

  interface $$Props extends BaseInputProps {}

  export let element: $$Props['element'] = undefined;
  export let error: $$Props['error'] = undefined;
  export let value: $$Props['value'] = '';

  function rule(value: string) {
    return new Phone(value);
  }
</script>

<BaseInput
  {...$$restProps}
  autocomplete="phone"
  rules={{
    rule,
    ...$$restProps.rules,
  }}
  bind:element={element}
  bind:error={error}
  bind:value={value}
  on:*
/>
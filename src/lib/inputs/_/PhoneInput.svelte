<script lang="ts">
	import BaseInput, { type BaseInputProps } from './BaseInput.svelte';
  import { Phone } from '$lib/domains'

  interface $$Props extends BaseInputProps {}

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
  on:*
/>
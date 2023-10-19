<script lang="ts">
	import BaseInput, { type BaseInputProps } from '../base/index.svelte';
  import { Email } from '$lib/domains'

  interface $$Props extends BaseInputProps {}

  function rule(value: string) {
    return new Email(value);
  }
</script>

<BaseInput
  {...$$restProps}
  type="email"
  autocomplete="email"
  rules={{
    rule,
    ...$$restProps.rules,
  }}
  on:*
/>
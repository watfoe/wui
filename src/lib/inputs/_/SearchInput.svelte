<script lang="ts">
	import BaseInput, { type BaseInputProps } from "./BaseInput.svelte";

  type $$Props = BaseInputProps;

  let value: string = '';
  function clearSearch() {
    value = ''
  }

</script>

<BaseInput
  autocomplete="search"
  {...$$restProps}
  class="cs-input-search {$$restProps.class}"
  type="text"
  suffix={{
    ...$$restProps.suffix,
    appearance: 'icon',
    name: 'clear',
    size: 20,
    onClick: clearSearch,
  }}
  bind:value={value}
  on:*
/>
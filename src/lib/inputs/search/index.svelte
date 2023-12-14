<script lang="ts">
	import { Button } from "$lib/button";
	import BaseInput, { type BaseInputProps } from "../base/index.svelte";

  type $$Props = BaseInputProps;

  export let color: $$Props['color'] = 'neutral';
  export let element: $$Props['element'] = undefined;
  export let error: $$Props['error'] = undefined;
  export let value: $$Props['value'] = '';

  function clear() {
    value = ''
  }
</script>

<BaseInput
  {...$$restProps}
  role="searchbox"
  aria-label="Search"
  autocomplete="search"
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  type="text"
  bind:element={element}
  bind:error={error}
  bind:value={value}
  on:*
>
  <Button
    variant="plain"
    {color}
    size="sm"
    slot="suffix"
    prefix="clear"
    on:click={clear}
  />
</BaseInput>
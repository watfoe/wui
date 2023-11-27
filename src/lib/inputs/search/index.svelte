<script lang="ts">
	import { Button } from "$lib/button";
	import BaseInput, { type BaseInputProps } from "../base/index.svelte";

  type $$Props = BaseInputProps;

  let value: string = '';
  function clear() {
    value = ''
  }
</script>

<BaseInput
  {...$$restProps}
  autocomplete="search"
  type="text"
  on:*
>
  <Button
    variant="plain"
    color="neutral"
    size="sm"
    slot="suffix"
    icon="clear"
    bind:value={value}
    on:click={clear}
  />
</BaseInput>
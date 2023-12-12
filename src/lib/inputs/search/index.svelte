<script lang="ts">
	import { Button } from "$lib/button";
	import BaseInput, { type BaseInputProps } from "../base/index.svelte";

  type $$Props = BaseInputProps;

  let value: string = '';
  export let color: $$Props['color'] = 'neutral';

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
    {color}
    size="sm"
    slot="suffix"
    prefix="clear"
    bind:value={value}
    on:click={clear}
  />
</BaseInput>
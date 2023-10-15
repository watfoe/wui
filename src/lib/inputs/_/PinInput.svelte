<script context="module" lang="ts">
  export interface PinFieldProps extends BaseInputProps {
    length?: number;
  }
</script>

<script lang="ts">
	import Row from "$lib/layout/_/Row.svelte";
	import { onMount } from "svelte";
	import BaseInput, { type BaseInputProps } from "./BaseInput.svelte";

  type $$Props = BaseInputProps & {
    length?: number;
    secure?: boolean;
  }

  let inputs: BaseInput[] = [];
  export let length: $$Props['length'] = 6;

  onMount(() => {
    inputs.fill(1, 0, length);
    // inputs[0].focus();
  });
</script>

<Row justify="space-between">
  {#each inputs as input, i}
    <BaseInput
      type="number"
      maxlength={1}
    />
  {/each}
</Row>

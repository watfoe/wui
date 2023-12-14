<script lang="ts">
  import { Button } from '$lib/button';
	import BaseInput, { type BaseInputProps } from "../base/index.svelte";

  interface $$Props extends BaseInputProps {
    secure: boolean
  }

  export let color: $$Props['color'] = 'neutral';
  export let element: $$Props['element'] = undefined;
  export let error: $$Props['error'] = undefined;
  export let secure = true;
  export let value: $$Props['value'] = '';

  function toggle() {
    secure = !secure;
  }
</script>

<BaseInput
  {...$$restProps}
  autocomplete="password"
  type={secure ? 'password' : 'text'}
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  suffix="visibility"
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
    prefix={secure ? 'visibility' : 'visibility_off'}
    on:click={toggle}
  />
</BaseInput>
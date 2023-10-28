<script lang="ts">
  import { Button } from '$lib/buttons';
	import BaseInput, { type BaseInputProps } from "../base/index.svelte";

  interface $$Props extends BaseInputProps {
    secure: boolean
  }

  export let secure = true;

  function toggle() {
    secure = !secure;
  }
</script>

<BaseInput
  autocomplete="password"
  {...$$restProps}
  type={secure ? 'password' : 'text'}
  suffix="visibility"
  on:*
>
  <Button
    variant="plain"
    color="neutral"
    size="sm"
    slot="suffix"
    icon={secure ? 'visibility' : 'visibility_off'}
    on:click={toggle}
  />
</BaseInput>
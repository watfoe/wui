<script lang="ts">
  import { Button } from '$lib/button';
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
  {...$$restProps}
  autocomplete="password"
  type={secure ? 'password' : 'text'}
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
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
<script lang="ts">
	import BaseInput, { type BaseInputProps } from "../base/index.svelte";

  interface $$Props extends BaseInputProps {
    secure: boolean
  }

  export let secure = true;

  function toggleSecure() {
    secure = !secure;
  }
</script>

<BaseInput
  autocomplete="password"
  {...$$restProps}
  type={secure ? 'password' : 'text'}
  suffix={{
    name: secure ? 'visibility_off' : 'visibility',
    size: 20,
    "on:click": toggleSecure,
  }}
  on:*
/>
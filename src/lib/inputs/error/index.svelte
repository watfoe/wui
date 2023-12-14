<script lang="ts">
  import { Text } from '$lib/typography';
	import type { ValidationError } from '../_common_';
  export let error: ValidationError;

  function errorToString(error: ValidationError) {
    let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
    message = message.charAt(0).toUpperCase() + message.slice(1);
    return message;
  };
</script>

<Text variant="label" size="sm" color="danger" class="WuiInput__error">
  {errorToString(error)}
</Text>

<style>
  :global(.WuiInput__error) {
    background-color: var(--color-surface);
    left: calc(var(--space-nm) - var(--space-xs));
    padding: 0 var(--space-xs);
    position: absolute;
    bottom: -6px;
    z-index: 1000;
  }
</style>
<script lang="ts">
  import { Text } from '$lib/typography';
  export let error: string;
</script>

<Text variant="label" size="sm" color="danger" class="WuiInput__error">{error}</Text>

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
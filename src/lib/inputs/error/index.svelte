<script lang="ts">
  export let error: string;
</script>

<span class="WuiInputError" {...$$restProps}>{error}</span>

<style>
  .WuiInputError {
    background-color: var(--color-surface);
    color: var(--color-status-error) !important;
    font-size: 11px;
    padding: 0 var(--space-xs);
    position: absolute;
    left: calc(var(--space-md) - var(--space-xs));
    bottom: -6px;
    z-index: 1000;
  }
</style>
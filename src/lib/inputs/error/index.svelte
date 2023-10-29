<script lang="ts">
  export let error: string;
</script>

<span class="WuiInputError" {...$$restProps}>{error}</span>

<style>
  .WuiInputError {
    background-color: var(--color-surface);
    color: var(--color-status-error) !important;
    font-size: 11px;
    padding: 0 var(--space-xxs);
    position: absolute;
    left: calc(var(--space-nm) - var(--space-xxs));
    bottom: -6px;
    z-index: 1000;
  }
</style>
<script lang="ts">
  export let error: string;
</script>

<span class="WuiInputError" {...$$restProps}>{error}</span>

<style>
  .WuiInputError {
    color: var(--color-error) !important;
    font-size: 0.6875rem;
    position: absolute;
    left: var(--space-nm);
    bottom: -13px;
    z-index: 1000;
  }
</style>
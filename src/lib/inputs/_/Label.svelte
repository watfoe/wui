<script lang="ts">
  import { Col } from "$lib/layout";

  interface $$Props {
    focused: boolean;
    errored: boolean;
    description?: string;
  }

  export let focused: $$Props['focused'] = false;
  export let errored: $$Props['errored'] = false;
  export let description: $$Props['description'] = undefined;
</script>

<Col justify="flex-start" align="flex-start" class="label-cont">
  <label class="{focused ? 'focused' : ''} {errored ? 'errored' : ''}">
    <slot />
  </label>

  {#if description}
    <span class="description">{description}</span>
  {/if}
</Col>

<style lang="scss">
  .label-cont {
    width: 100% !important;

    label {
      color: var(--color-on-surface-variant);
      font-size: 11px;
      line-height: 13px;
      margin: 0 0 1px var(--space-nm);
      max-width: calc(100% - (2*var(--space-nm)));
      overflow: hidden;
      z-index: 10;

      &.focused {
        color: var(--color-primary);
      }

      &.errored {
        color: var(--color-status-error) !important;
      }
    }

    .description {
      color: var(--color-on-surface-variant);
      font-size: 10px;
      margin: 0 0 1px var(--space-nm);
      max-width: calc(100% - (2*var(--space-nm)));
      overflow: hidden;
      z-index: 10;
    }
  }
</style>
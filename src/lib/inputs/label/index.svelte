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

<style>
  @import "./style.scss";
</style>

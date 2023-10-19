<script lang="ts">
  import type { HTMLDialogAttributes } from "svelte/elements";

  interface $$Props extends HTMLDialogAttributes {
    transparent?: boolean;
  }

  export let transparent: $$Props['transparent'] = false;

  function open(e: CustomEvent<HTMLDialogElement>) {
    const feedback = e.target as HTMLDialogElement;
    feedback?.showModal();
    feedback?.addEventListener('click', () => {
      feedback?.close();
    }, { once: true });
  }
</script>

<dialog
  {...$$restProps}
  class={$$restProps.class}
  on:open={open}
  style="--bg:{transparent ? 'transparent' : 'var(--color-scrim)'}"
  on:*
>
  <slot />
</dialog>

<style>
  @import './style.scss';
</style>

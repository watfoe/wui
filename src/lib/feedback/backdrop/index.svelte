<script lang="ts">
  import type { HTMLDialogAttributes } from "svelte/elements";

  interface $$Props extends HTMLDialogAttributes {
    transparent?: boolean;
  }

  let backdrop;
  export let transparent: $$Props['transparent'] = false;

  function open(e: CustomEvent<HTMLDialogElement>) {
    const backdrop = e.target as HTMLDialogElement;
    backdrop?.showModal();
    backdrop?.addEventListener('click', (e) => {
      backdrop?.close();
    }, { once: true });
    // Add a listener for when this backdrop can be close programmatically
    backdrop?.addEventListener('closebackdrop', (e) => {
      backdrop?.close();
    }, { once: true });
  }
</script>

<dialog
  bind:this={backdrop}
  {...$$restProps}
  role="presentation"
  class="WuiBackdrop WuiBackdrop-transparent-{transparent} {$$restProps.class}"
  on:open={open}
  on:*
>
  <slot />
</dialog>

<style>
  .WuiBackdrop {
    border: 0;
    max-width: 100vw !important;
    max-height: 100vh !important;
    width: 100vw !important;
    height: 100vh !important;
    outline: 0;
    transition: opacity 3s;
    padding: var(--space-xs);
    inset: 0px;
    z-index: -1;
    -webkit-tap-highlight-color: transparent;
  }
  .WuiBackdrop-transparent-true {
    background-color: transparent;
  }
  .WuiBackdrop-transparent-false {
    background-color: var(--color-scrim);
    backdrop-filter: blur(8px);
  }

  .WuiBackdrop > :global(*) {
    background-color: var(--color-surface);
    border-radius: var(--radius);
    max-width: 60vw !important;
  }

  .WuiBackdrop::backdrop {
    background-color: transparent;
  }

  &[open] {
    animation: fade 0.3s ease normal;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

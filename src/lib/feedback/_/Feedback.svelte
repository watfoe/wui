<script context="module" lang=ts>
	import type { HTMLDialogAttributes } from "svelte/elements";
</script>

<script lang="ts">
  interface $$Props extends HTMLDialogAttributes {
    transparent?: boolean;
  }

  export let transparent: $$Props['transparent'] = false;

  function handleOpen(e: CustomEvent<HTMLDialogElement>) {
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
  on:open={handleOpen}
  style="--bg:{transparent ? 'transparent' : 'var(--color-scrim)'}"
  on:*
>
  <slot />
</dialog>

<style lang="scss">
  dialog {
    background-color: var(--bg);
    border: 0;
    max-width: 100vw !important;
    max-height: 100vh !important;
    width: 100vw !important;
    height: 100vh !important;
    outline: 0;
    transition: opacity 3s;
    padding: var(--space-xs);
    z-index: 10000;

    & > :global(*) {
      background-color: var(--color-surface);
      border-radius: var(--border-radius);
      max-width: 60vw !important;
    }

    &::backdrop {
      background-color: transparent;
    }

    &[open] {
      animation: fade 0.3s ease normal;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
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
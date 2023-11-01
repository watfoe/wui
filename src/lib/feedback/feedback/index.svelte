<script lang="ts">
  import './style.css';

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
  class="WuiFeedback WuiFeedback-transparent-{transparent} {$$restProps.class}"
  on:open={open}
  on:*
>
  <slot />
</dialog>

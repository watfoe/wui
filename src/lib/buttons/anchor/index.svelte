<script context="module" lang="ts">
  import type {ButtonProps} from "../button/index.svelte";

  interface AnchorProps extends ButtonProps {
    for?: string;
  }
</script>

<script lang="ts">
  import Button from "../button/index.svelte";
	import { onMount } from "svelte";

  type $$Props = AnchorProps;

  let _for: $$Props['for'] = undefined;
  export { _for as for };

  let feedback: HTMLDialogElement;

  onMount(() => {
    if (_for) {
      const _feedback = document.getElementById(_for);

      if (_feedback instanceof HTMLDialogElement) {
        feedback = _feedback;
      } else {
        throw new Error(`Anchor button "for" attribute must be a valid dialog id`);
      }
    } else {
      throw new Error('Anchor button must have a "for" attribute');
    }
  });

  function click(e: CustomEvent<HTMLButtonElement>) {
    e.stopImmediatePropagation();
    feedback?.dispatchEvent(new CustomEvent('open', { detail: {
      anchor: e.currentTarget
    }}));
  };
</script>

<Button {...$$restProps} on:click={click} on:*>
  {#if $$slots.default}
    <slot />
  {/if}
</Button>

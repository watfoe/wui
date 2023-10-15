<script context="module" lang="ts">
  import type {
    ButtonProps, IconButtonProps, NoneButtonProps, PrimaryButtonProps,
    SecondaryButtonProps, TextButtonProps
  } from "./Button.svelte";

  interface _AnchorProps {
    for?: string;
  }

  export interface NoneAnchorProps extends NoneButtonProps, _AnchorProps {}
  export interface PrimaryAnchorProps extends PrimaryButtonProps, _AnchorProps {}
  export interface SecondaryAnchorProps extends SecondaryButtonProps, _AnchorProps {}
  export interface IconAnchorProps extends IconButtonProps , _AnchorProps {}
  export interface TextAnchorProps extends TextButtonProps , _AnchorProps {}
  export type AnchorProps = ButtonProps & _AnchorProps;
</script>

<script lang="ts">
  import Button from "./Button.svelte";
	import { onMount } from "svelte";

  type $$Props = AnchorProps;

  let _for: $$Props['for'] = undefined;
  export { _for as for };

  let feedback: HTMLDialogElement;

  onMount(() => {
    if (_for) {
      feedback = document.getElementById(_for) as HTMLDialogElement;
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
  <slot />
</Button>

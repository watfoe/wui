<script context="module" lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';

	export interface BaseBackdropAttributes {
		transparent?: boolean;
		opened?: boolean;
		onopen?: (e: CustomEvent<HTMLDialogElement>) => void;
		// Redefine for types that want to extend BackdropAttributes but do not want
		// to inherit props other than the ones defined in this BaseBackdropAttributes
		onclose?: HTMLDialogAttributes['onclose'];
	}

	export interface BackdropAttributes extends BaseBackdropAttributes, HTMLDialogAttributes {
		backdrop?: HTMLDialogElement;
	}
</script>

<script lang="ts">
	import './style.css';
	import { untrack } from 'svelte';

	let {
		backdrop = $bindable(),
		children,
		opened = $bindable(false),
		transparent = false,
		onopen,
		onclose,
		...rest
	}: BackdropAttributes = $props();

	$effect(() => {
		untrack(() => {
			// @ts-ignore
			backdrop?.addEventListener('open', open);

			if (opened) {
				backdrop?.showModal();
			} else {
				backdrop?.close();
			}
		});
	});

	function keydown(e: KeyboardEvent & { currentTarget: HTMLDialogElement }) {
		// Browsers already implement the escape key to close the dialog. The problem is
		// that if we don't prevent the default behavior, the dialog will close but also some other
		// action will be triggered. For example, the browser window is minimized.
		if (e.key === 'Escape') {
			e.preventDefault();
			close(e);
		}
	}

	function open(e: CustomEvent<HTMLDialogElement>) {
		backdrop?.showModal();
		opened = true;
		onopen?.(e);
	}

	function close(e: Event & { currentTarget: HTMLDialogElement }) {
		if (opened) {
			backdrop?.close();
			opened = false;
			onclose?.(e);
		}
	}
</script>

<dialog
	{...rest}
	role="presentation"
	class="WuiBackdrop WuiBackdrop--transparent-{transparent} {rest.class || ''}"
	onclick={close}
	onkeydown={keydown}
	bind:this={backdrop}
>
	{#if children}
		{@render children()}
	{/if}
</dialog>

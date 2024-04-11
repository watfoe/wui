<script context="module" lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	export interface BackdropAttributes extends HTMLDialogAttributes {
		_this?: HTMLDialogElement;
		transparent?: boolean;
		opened?: boolean;
		onopen?: (e: CustomEvent<HTMLDialogElement>) => void;
		onclose?: (e: Event) => void;
	}
</script>

<script lang="ts">
	import './style.css';
	import { untrack } from 'svelte';

	let {
		_this = $bindable(),
		transparent = false,
		opened = $bindable(false),
		onopen,
		onclose,
		...rest
	}: BackdropAttributes = $props();

	$effect(() => {
		untrack(() => {
			// @ts-ignore
			_this?.addEventListener('open', open);
			_this?.addEventListener('close', close);

			if (opened) {
				_this?.showModal();
			} else {
				_this?.close();
			}
		});
	});

	function keydown(e: KeyboardEvent) {
		// Browsers already implement the escape key to close the dialog. The problem is
		// that if we don't prevent the default behavior, the dialog will close but also some other
		// action will be triggered. For example, the browser window is minimized.
		if (e.key === 'Escape') {
			e.preventDefault();
			close(e);
		}
	}

	function open(e: CustomEvent<HTMLDialogElement>) {
		_this?.showModal();
		opened = true;
		onopen?.(e);
	}

	function close(e: Event) {
		if (opened) {
			_this?.close();
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
	bind:this={_this}
>
	<slot />
</dialog>

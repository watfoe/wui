<script context="module" lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	export interface BackdropAttributes extends HTMLDialogAttributes {
		_this?: HTMLDialogElement;
		transparent?: boolean;
		opened?: boolean;
		onopen?: (e: CustomEvent<HTMLDialogElement>) => void;
		onclose?: () => void;
	}
</script>

<script lang="ts">
	import './style.css';
	import { onMount } from 'svelte';

	let {
		_this,
		transparent = false,
		opened,
		onopen,
		onclose,
		...rest
	} = $props<BackdropAttributes>();

	onMount(() => {
		// @ts-ignore
		_this?.addEventListener('open', open);
	});

	function open(e: CustomEvent<HTMLDialogElement>) {
		_this?.showModal();
		opened = true;

		_this?.addEventListener(
			'click',
			(e) => {
				close();
			},
			{ once: true }
		);

		_this?.addEventListener(
			'keydown',
			(e) => {
				if (e.key === 'Escape') {
					e.preventDefault();
					close();
				}
			},
			{ once: true }
		);

		onopen?.(e);
	}

	function close() {
		_this?.close();
		opened = false;
		onclose?.();
	}
</script>

<dialog
	{...rest}
	role="presentation"
	class="WuiBackdrop WuiBackdrop--transparent-{transparent} {rest.class || ''}"
	bind:this={_this}
>
	<slot />
</dialog>

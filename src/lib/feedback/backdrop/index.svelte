<script lang="ts">
	import './style.css';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	interface BackdropAttributes extends HTMLDialogAttributes {
		transparent?: boolean;
		element?: HTMLDialogElement;
		opened?: boolean;
		onopen?: (e: CustomEvent<HTMLDialogElement>) => void;
	}

	let {
		element,
		transparent = false,
		opened = false,
		onopen,
		...rest
	} = $props<BackdropAttributes>();

	$effect(() => {
		if (element) {
			element.addEventListener('open', open);
		}
	});

	function open(e: CustomEvent<HTMLDialogElement>) {
		element?.showModal();
		opened = true;

		element?.addEventListener(
			'click',
			(e) => {
				element?.close();
				opened = false;
			},
			{ once: true }
		);

		element?.addEventListener(
			'keydown',
			(e) => {
				if (e.key === 'Escape') {
					e.preventDefault();
					element?.close();
					opened = false;
				}
			},
			{ once: true }
		);

		onopen?.(e);
	}
</script>

<dialog
	bind:this={element}
	{...rest}
	role="presentation"
	class="WuiBackdrop WuiBackdrop--transparent-{transparent} {rest.class || ''}"
>
	<slot />
</dialog>

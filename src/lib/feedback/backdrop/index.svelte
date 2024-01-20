<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';

	interface $$Props extends HTMLDialogAttributes {
		transparent?: boolean;
		element?: HTMLDialogElement;
		opened?: boolean;
	}

	let element: $$Props['element'] = undefined;
	export let transparent: $$Props['transparent'] = false;
	export let opened: $$Props['opened'] = false;

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
	}
</script>

<dialog
	bind:this={element}
	{...$$restProps}
	role="presentation"
	class="WuiBackdrop WuiBackdrop--transparent-{transparent} {$$restProps.class || ''}"
	on:open={open}
	on:*
>
	<slot />
</dialog>

<style>
	:global(html):has(dialog[open]) {
		overflow: hidden !important;
	}
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
		overflow: hidden;
		-webkit-tap-highlight-color: transparent;
	}
	.WuiBackdrop--transparent-true {
		background-color: transparent;
	}
	.WuiBackdrop--transparent-false {
		background-color: var(--color-scrim);
		backdrop-filter: blur(8px);
	}

	.WuiBackdrop > :global(*) {
		background-color: var(--color-surface);
		border-radius: var(--radius);
		max-width: 60vw !important;
		max-height: calc(100vh - calc(var(--space-xs) * 2)) !important;
		overflow-y: auto;
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

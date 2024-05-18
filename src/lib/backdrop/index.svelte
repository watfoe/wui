<script context="module" lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';

	export interface BaseBackdropAttributes {
		backdrop?: HTMLDialogElement;
		closeon?: 'blur' | 'click' | 'none';
		transparent?: boolean;
		opened?: boolean;
		onopen?: (e: CustomEvent<HTMLDialogElement>) => void;
		// Redefine for types that want to extend BackdropAttributes but do not want
		// to inherit props other than the ones defined in this BaseBackdropAttributes
		onclose?: HTMLDialogAttributes['onclose'];
	}

	export interface BackdropAttributes extends BaseBackdropAttributes, HTMLDialogAttributes {}
</script>

<script lang="ts">
	import { untrack } from 'svelte';

	let {
		backdrop = $bindable(),
		children,
		class: _class = '',
		closeon = 'click',
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
			backdrop?.addEventListener('close', (e) => {
				onclose?.(e);
			});

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
			close();
		}
	}

	function open(e: CustomEvent<HTMLDialogElement>) {
		backdrop?.showModal();
		opened = true;
		onopen?.(e);
	}

	function close() {
		if (opened) {
			backdrop?.close();
			opened = false;
		}
	}
</script>

<dialog
	{...rest}
	role="presentation"
	class="w-backdrop w-backdrop--transparent-{transparent} {_class}"
	onclick={closeon === 'click' ? close : undefined}
	onblur={closeon === 'blur' ? close : undefined}
	onkeydown={keydown}
	bind:this={backdrop}
>
	{#if children}
		{@render children()}
	{/if}
</dialog>

<style>
	.w-backdrop {
		animation: fade 0.3s ease normal;
		border: 0;
		inset: 0px;
		max-width: 100vw;
		max-height: 100vh;
		width: 100vw;
		height: 100vh;
		outline: 0;
		padding: var(--space-xs);
		overflow: hidden;
	}

	.w-backdrop--transparent-true {
		background-color: transparent;
	}

	.w-backdrop--transparent-false {
		background-color: var(--color-scrim);
		backdrop-filter: blur(8px);
	}

	.w-backdrop::backdrop {
		background-color: transparent;
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

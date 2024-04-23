<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { LikeButtonAttributes } from '$lib/utils';

	type LB = LikeButtonAttributes<HTMLButtonAttributes>;

	export interface ButtonAttributes extends Omit<LB, 'element' | 'navigation'> {
		anchorfor?: string;
		disabled?: boolean;
		loading?: boolean;
		navigation?: LB['navigation'] | 'feedback';
	}
</script>

<script lang="ts">
	import './style.css';
	import { LikeButton } from '$lib';
	import { untrack } from 'svelte';

	let {
		anchorfor,
		class: _class = '',
		loading = false,
		disabled = false,
		navigation,
		px = 'sm',
		type = 'button',
		onclick,
		onkeydown,
		...rest
	}: ButtonAttributes = $props();

	let feedback: HTMLDialogElement;
	let feedbackExpanded = $state(false);

	$effect(() => {
		untrack(() => {
			if (anchorfor) {
				const _feedback = document.getElementById(anchorfor);

				if (_feedback instanceof HTMLDialogElement) {
					feedback = _feedback;
					feedback.onclose = () => {
						feedbackExpanded = false;
					};
				} else {
					throw new Error(`button "anchorfor" attribute must be a valid dialog id`);
				}
			}
		});
	});

	function click(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (loading || disabled) {
			return;
		}

		if (feedback) {
			show_feedback(e.currentTarget);
		}

		onclick?.(e);
	}

	// Keyboard accessibility
	function keydown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (loading || disabled) {
			return;
		}

		const key = e.key;
		if (navigation === 'feedback' && feedback && (key === 'ArrowDown' || key === 'ArrowUp')) {
			show_feedback(e.currentTarget);
		}

		onkeydown?.(e);
	}

	function show_feedback(btn: HTMLButtonElement) {
		feedback.dispatchEvent(
			new CustomEvent('open', {
				detail: {
					anchor: btn
				}
			})
		);

		feedbackExpanded = true;
	}
</script>

<LikeButton
	{...rest}
	aria-haspopup={anchorfor ? 'true' : undefined}
	aria-expanded={anchorfor ? feedbackExpanded : undefined}
	aria-controls={anchorfor || undefined}
	disabled={loading || disabled}
	{px}
	{navigation}
	{type}
	onclick={click}
	onkeydown={keydown}
	class="{loading ? 'WuiButton--loading ' : ''} {_class}"
/>

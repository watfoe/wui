<script context="module" lang="ts">
	import type { LikeButtonAttributes } from '$lib/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type LB = LikeButtonAttributes<HTMLButtonAttributes>;

	export interface ButtonAttributes extends Omit<LB, 'element' | 'navigation'> {
		anchorfor?: string;
		anchoron?: 'click' | 'mouseover';
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
		anchoron = 'click',
		class: _class = '',
		loading = false,
		disabled = false,
		navigation,
		px = 'sm',
		type = 'button',
		onclick,
		onkeydown,
		onmouseover,
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
					navigation = 'feedback';
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

		if (feedback && anchoron === 'click') {
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

	function mouseover(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (loading || disabled) {
			return;
		}

		if (feedback && anchoron === 'mouseover') {
			show_feedback(e.currentTarget);
		}

		onmouseover?.(e);
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
	element="button"
	aria-haspopup={anchorfor ? 'true' : undefined}
	aria-expanded={anchorfor ? feedbackExpanded : undefined}
	aria-controls={anchorfor || undefined}
	class="{loading ? 'WuiButton--loading ' : ''} {_class}"
	disabled={loading || disabled}
	navigation={navigation === 'feedback' ? 'none' : navigation}
	onclick={click}
	onmouseover={mouseover}
	onkeydown={keydown}
	{px}
	{type}
	{...rest}
/>

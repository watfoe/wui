<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { LikeButtonAttributes } from '$lib';

	type LB = LikeButtonAttributes<HTMLButtonElement, HTMLButtonAttributes>;

	export interface ButtonAttributes extends Omit<LB, 'element' | 'navigation'> {
		_this?: HTMLButtonElement;
		anchorfor?: string;
		bold?: boolean;
		disabled?: boolean;
		loading?: boolean;
		navigation?: LB['navigation'] | 'feedback';
	}
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import { untrack } from 'svelte';

	let {
		_this = $bindable(),
		anchorfor,
		bold = false,
		gap = 'sm',
		height,
		size = 'md',
		variant = 'solid',
		color = 'primary',
		loading = false,
		disabled = false,
		justify = 'center',
		navigation = 'none',
		pad,
		padx = 'sm',
		pady = 'none',
		prefix,
		role,
		suffix,
		shape = 'rounded',
		type = 'button',
		onclick,
		onkeydown,
		width,
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
			show_feedback();
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
			show_feedback();
		} else if (navigation !== 'none') {
			if (
				(navigation === 'horizontal' && key === 'ArrowRight') ||
				(navigation === 'vertical' && key === 'ArrowDown') ||
				(navigation === 'mixed' && (key === 'ArrowRight' || key === 'ArrowDown'))
			) {
				navigate_down();
			} else if (
				(navigation === 'vertical' && key === 'ArrowUp') ||
				(navigation === 'horizontal' && key === 'ArrowLeft') ||
				(navigation === 'mixed' && (key === 'ArrowUp' || key === 'ArrowLeft'))
			) {
				navigate_up();
			}
		}

		onkeydown?.(e);
	}

	function navigate_down() {
		const next = _this?.nextElementSibling as HTMLElement;
		if (next) {
			next.focus();
		} else if (_this?.previousElementSibling) {
			// There are other siblings
			const first = _this.parentElement?.firstElementChild as HTMLButtonElement;
			first?.focus();
		}
	}

	function navigate_up() {
		const prev = _this?.previousElementSibling as HTMLElement;
		if (prev) {
			prev.focus();
		} else if (_this?.nextElementSibling) {
			// There are other siblings
			const last = _this.parentElement?.lastElementChild as HTMLButtonElement;
			last?.focus();
		}
	}

	function show_feedback() {
		feedback.dispatchEvent(
			new CustomEvent('open', {
				detail: {
					anchor: _this
				}
			})
		);

		feedbackExpanded = true;
	}
</script>

<button
	{...rest}
	aria-haspopup={anchorfor ? 'true' : undefined}
	aria-expanded={anchorfor ? feedbackExpanded : undefined}
	aria-controls={anchorfor || undefined}
	disabled={loading || disabled}
	class="
		WuiClickable
		WuiVariant-{variant}
		WuiColor-{color}
		WuiShape-{shape}
		WuiGap-{gap || size}
		WuiPadding-x-{padx || pad || size}
		WuiPadding-y-{pady || pad || size}
		WuiLikeButton
		WuiText WuiText--body WuiText--md
		{bold ? 'WuiText--bold' : ''}
		{width ? 'WuiWidth-' + width : ''}
		{height ? 'WuiHeight-' + height : ''}
		{!$$slots.default ? 'WuiLikeButton--only-icon' : ''}
		{loading ? 'WuiButton--loading' : ''}
		{rest.class || ''}"
	style="height:var(--height-{size});{rest.style || ''};justify-content:{justify}"
	{type}
	onclick={click}
	onkeydown={keydown}
	bind:this={_this}
>
	{#if $$slots.prefix}
		<slot name="prefix" />
	{:else if prefix}
		<Icon {size}>{prefix}</Icon>
	{/if}

	{#if $$slots.default}
		<slot />
	{/if}

	{#if $$slots.suffix}
		<slot name="suffix" />
	{:else if suffix}
		<Icon {size}>{suffix}</Icon>
	{/if}
</button>

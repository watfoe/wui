<script context="module" lang="ts">
	import type { WuiFlexJustify, WuiSize } from '$lib/types';

	export type LikeButtonAttributes<A> = SurfaceAttributes<Omit<A, 'prefix'>> & {
		anchorfor?: string;
		anchoron?: 'click' | 'mouseover';
		bold?: boolean;
		disabled?: boolean;
		justify?: WuiFlexJustify;
		navigation?: 'horizontal' | 'vertical' | 'mixed' | 'none';
		prefix?: Snippet | string;
		suffix?: Snippet | string;
		size?: WuiSize;
	};
</script>

<script lang="ts">
	import { Icon } from '../icon';
	import { Surface, type SurfaceAttributes } from '../surface';
	import { untrack, type Snippet } from 'svelte';

	let {
		_this = $bindable(),
		anchorfor,
		anchoron = 'click',
		bold = false,
		children,
		color = 'primary',
		direction = 'row',
		disabled = false,
		element = 'button',
		gap = 'sm',
		height,
		justify = 'center',
		navigation = 'none',
		prefix,
		suffix,
		shape = 'rounded',
		style = '',
		size = 'md',
		px,
		tabindex,
		textsize,
		variant = 'solid',
		width,
		onclick,
		onkeydown,
		onmouseover,
		...rest
	}: LikeButtonAttributes<any> = $props();

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
					throw new Error(`"anchorfor" attribute must be a valid dialog id`);
				}
			}
		});
	});

	function click(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (disabled) {
			return;
		}

		if (feedback && anchoron === 'click') {
			show_feedback(e.currentTarget);
		}

		onclick?.(e);
	}

	function mouseover(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (disabled) {
			return;
		}

		if (feedback && anchoron === 'mouseover') {
			show_feedback(e.currentTarget);
		}

		onmouseover?.(e);
	}

	// Keyboard accessibility
	function keydown(e: KeyboardEvent & { currentTarget: EventTarget }) {
		const key = e.key;
		if (feedback && (key === 'ArrowDown' || key === 'ArrowUp')) {
			show_feedback(e.currentTarget as HTMLButtonElement);
		} else if (
			(navigation === 'horizontal' && key === 'ArrowRight') ||
			(navigation === 'vertical' && key === 'ArrowDown') ||
			(navigation === 'mixed' && (key === 'ArrowRight' || key === 'ArrowDown'))
		) {
			navigate_down(e.currentTarget as HTMLElement);
		} else if (
			(navigation === 'vertical' && key === 'ArrowUp') ||
			(navigation === 'horizontal' && key === 'ArrowLeft') ||
			(navigation === 'mixed' && (key === 'ArrowUp' || key === 'ArrowLeft'))
		) {
			navigate_up(e.currentTarget as HTMLElement);
		}

		onkeydown?.(e);
	}

	function show_feedback(btn: HTMLElement) {
		feedback.dispatchEvent(
			new CustomEvent('open', {
				detail: {
					anchor: btn
				}
			})
		);

		feedbackExpanded = true;
	}

	function navigate_down(target: HTMLElement) {
		const next = target.nextElementSibling as HTMLElement;
		if (next) {
			next.focus();
		} else if (target?.previousElementSibling) {
			// There are other siblings
			const first = target.parentElement?.firstElementChild as HTMLButtonElement;
			first?.focus();
		}
	}

	function navigate_up(target: HTMLElement) {
		const prev = target.previousElementSibling as HTMLElement;
		if (prev) {
			prev.focus();
		} else if (target.nextElementSibling) {
			// There are other siblings
			const last = target.parentElement?.lastElementChild as HTMLButtonElement;
			last?.focus();
		}
	}
</script>

<Surface
	aria-haspopup={anchorfor ? 'true' : undefined}
	aria-expanded={anchorfor ? feedbackExpanded : undefined}
	aria-controls={anchorfor || undefined}
	px={children ? px : undefined}
	tabindex={tabindex || 0}
	textsize={textsize || size}
	height={height || size}
	shape={shape === 'circle' ? 'pill' : shape}
	width={!width && !children ? size : width}
	onclick={click}
	onmouseover={mouseover}
	onkeydown={keydown}
	{color}
	{direction}
	{disabled}
	{element}
	{gap}
	{justify}
	{style}
	{variant}
	{...rest}
	clickable
	bind:_this
>
	{#if typeof prefix === 'string'}
		<Icon {size}>{prefix}</Icon>
	{:else if prefix}
		{@render prefix()}
	{/if}

	{#if children}
		{@render children()}
	{/if}

	{#if typeof suffix === 'string'}
		<Icon {size} style={justify === 'space-between' ? 'margin-left:auto' : undefined}>
			{suffix}
		</Icon>
	{:else if suffix}
		{@render suffix()}
	{/if}
</Surface>

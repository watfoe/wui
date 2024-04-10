<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export interface ButtonAttributes extends HTMLButtonAttributes {
		_this?: HTMLButtonElement;
		anchorfor?: string;
		bold?: boolean;
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		disabled?: boolean;
		gap?: 'sm' | 'nm' | 'md' | 'lg';
		height?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
		justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
		loading?: boolean;
		prefix?: string;
		rounded?: boolean;
		size?: 'sm' | 'md' | 'lg';
		suffix?: string;
		variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
		width?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
	}
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';
	import { untrack } from 'svelte';

	let {
		_this = $bindable(),
		anchorfor,
		bold = false,
		gap = 'nm',
		height,
		size = 'md',
		variant = 'solid',
		color = 'primary',
		loading = false,
		disabled = false,
		justify = 'center',
		prefix,
		rounded = false,
		suffix,
		type = 'button',
		onclick,
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
			feedback.dispatchEvent(
				new CustomEvent('open', {
					detail: {
						anchor: e.currentTarget
					}
				})
			);

			feedbackExpanded = true;
		}

		onclick?.(e);
	}
</script>

<button
	{...rest}
	aria-haspopup={anchorfor ? 'true' : undefined}
	aria-expanded={anchorfor ? feedbackExpanded : undefined}
	aria-controls={anchorfor || undefined}
	disabled={loading || disabled}
	class="WuiLikeButton WuiLikeButton--{variant} WuiLikeButton--{size} WuiLikeButton--{color} WuiLikeButton--gap-{gap} {width
		? 'WuiLikeButton--width-' + width
		: ''} {height ? 'WuiLikeButton--height-' + height : ''} {!$$slots.default
		? 'WuiLikeButton--only-icon'
		: ''} {loading ? 'WuiLikeButton--loading' : ''} {rest.class || ''}"
	style="{rest.style || ''};--WuiLikeButtonFlex-justify:{justify};{rounded
		? '--WuiLikeButton-radius:calc(var(--WuiLikeButton-height) / 2);'
		: ''}"
	{type}
	onclick={click}
	bind:this={_this}
>
	{#if $$slots.prefix}
		<slot name="prefix" />
	{:else if prefix}
		<Icon {size}>{prefix}</Icon>
	{/if}

	{#if $$slots.default}
		<Text variant="body" {bold}><slot /></Text>
	{/if}

	{#if $$slots.suffix}
		<slot name="suffix" />
	{:else if suffix}
		<Icon {size}>{suffix}</Icon>
	{/if}
</button>

<script context="module" lang="ts">
	import type { WuiFlexJustify, WuiSize, WuiSpacing, WuiSurface } from '$lib/types';

	export type LikeButtonAttributes<T extends HTMLElement, A = HTMLAttributes<T>> = A &
		WuiSurface & {
			bold?: boolean;
			element: string;
			justify?: WuiFlexJustify;
			navigation?: 'vertical' | 'horizontal' | 'mixed' | 'none';
			pad?: WuiSpacing;
			padx?: WuiSpacing;
			pady?: WuiSpacing;
			prefix?: string;
			suffix?: string;
			size?: WuiSize;
		};
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		bold = false,
		element,
		gap = 'sm',
		size = 'md',
		variant = 'solid',
		color = 'primary',
		justify = 'center',
		navigation = 'none',
		pad,
		padx,
		pady = 'none',
		prefix,
		suffix,
		shape = 'rounded',
		width,
		height,
		onkeydown,
		...rest
	}: LikeButtonAttributes<any, any> = $props();

	// Keyboard accessibility
	function keydown(e: KeyboardEvent & { currentTarget: EventTarget }) {
		const key = e.key;
		if (navigation !== 'none') {
			if (
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
		}

		onkeydown?.(e);
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

<svelte:element
	this={element}
	role="button"
	tabindex="0"
	{...rest}
	class="
		WuiLikeButton
		WuiSurface
		WuiClickable
		WuiVariant-{variant}
		WuiColor-{color}
		WuiShape-{shape}
		WuiGap-{gap || size}
		WuiPadding-x-{padx || pad || size}
		WuiPadding-y-{pady || pad || size}
		WuiText WuiText--body WuiText--md
		{bold ? 'WuiText--bold' : ''}
		{width ? 'WuiWidth-' + width : ''}
		{height ? 'WuiHeight-' + height : ''}
		{!$$slots.default ? 'WuiLikeButton--only-icon' : ''}
		{rest.class || ''}"
	style="height:var(--height-{size});{rest.style || ''};justify-content:{justify}"
	onkeydown={keydown}
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
</svelte:element>

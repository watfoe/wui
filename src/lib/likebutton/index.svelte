<script context="module" lang="ts">
	import type { WuiDimension, WuiFlexJustify, WuiSize } from '$lib/types';

	export type LikeButtonAttributes<A> = SurfaceAttributes<Omit<A, 'prefix'>> & {
		bold?: boolean;
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
	import type { Snippet } from 'svelte';

	let {
		bold = false,
		children,
		class: _class = '',
		color = 'primary',
		direction = 'row',
		element = 'button',
		gap = 'sm',
		height,
		justify = 'center',
		navigation = 'none',
		px,
		prefix,
		suffix,
		shape = 'rounded',
		style = '',
		size = 'md',
		tabindex,
		textsize,
		variant = 'solid',
		width,
		onkeydown,
		...rest
	}: LikeButtonAttributes<any> = $props();

	height = height || (size as WuiDimension);
	width = !width && !children ? (size as WuiDimension) : width;

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

<Surface
	class="w-likebutton {_class}"
	px={children ? px : undefined}
	tabindex={tabindex || 0}
	textsize={textsize || size}
	onkeydown={keydown}
	{height}
	{width}
	{color}
	{direction}
	{element}
	{gap}
	{justify}
	{style}
	{shape}
	{variant}
	{...rest}
	clickable
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
		<Icon {size} style={justify === 'space-between' && prefix ? 'margin-left:auto' : undefined}
			>{suffix}</Icon
		>
	{:else if suffix}
		{@render suffix()}
	{/if}
</Surface>

<style>
	:global(.w-likebutton) {
		flex-shrink: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

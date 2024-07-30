<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import { getContext, untrack } from 'svelte';

	export interface OptionAttributes extends Omit<LikeButtonAttributes<'li'>, 'element'> {
		selected?: boolean;
		value?: string;
	}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';

	let {
		_this = $bindable(),
		color,
		px = 'sm',
		selected = $bindable(false),
		shape,
		size,
		style = '',
		value = $bindable(),
		variant,
		// we don't want to pass this prop to the LikeButton
		onclick,
		onchange,
		...rest
	}: OptionAttributes = $props();

	const ctx: {
		color: WuiColor;
		multiple: boolean;
		size: WuiSize;
		shape: WuiShape;
		select: (target: HTMLLIElement, c: () => void) => void;
		variant: WuiVariant;
	} = getContext('wui-select-ctx') || {};

	$effect(() => {
		untrack(() => {
			if (selected && value) {
				ctx.select(_this!, () => {
					selected = false;
				});
			}
		});
	});

	function keydown(e: KeyboardEvent) {
		if (_this && (e.key === 'Enter' || e.key === ' ' || e.key === 'Tab')) {
			select();
		}
	}

	function select() {
		selected = true;
		ctx.select(_this!, () => {
			selected = false;
		});
	}
</script>

<LikeButton
	aria-selected={selected}
	color={(color || ctx.color) === 'neutral' && (variant || ctx.variant) !== 'solid'
		? 'black'
		: color || ctx.color || 'black'}
	element="li"
	justify="flex-start"
	navigation="vertical"
	role="option"
	size={size || ctx.size || 'md'}
	shape={(shape || ctx.shape) === 'sharp' ? 'sharp' : 'rounded'}
	variant={ctx.variant === 'outlined' ? 'plain' : ctx.variant === 'mixed' ? 'soft' : ctx.variant}
	onkeydown={keydown}
	onclick={select}
	data-value={value}
	width="100%"
	bind:_this
	{px}
	{style}
	{...rest}
/>

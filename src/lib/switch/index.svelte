<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiColorWeight, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface SwitchAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		colorweight?: WuiColorWeight;
		name?: string;
		required?: boolean;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	}

	const SIZES = {
		xs: 18,
		sm: 20,
		md: 24,
		lg: 28,
		xl: 34
	};
</script>

<script lang="ts">
	import { LikeButton } from '../likebutton';

	let {
		_this = $bindable(),
		checked = $bindable(false),
		color = 'neutral',
		colorweight,
		size = 'md',
		shape = 'pill',
		value,
		variant = 'outlined',
		...rest
	}: SwitchAttributes = $props();

	const id = Math.random().toString(36);

	if (shape === 'circle') {
		shape = 'pill';
	}
</script>

<LikeButton
	color={checked ? (color === 'neutral' ? 'primary' : color) : 'neutral'}
	class="w-switch"
	element="label"
	for={id}
	height={SIZES[size]}
	p={2}
	variant={checked && variant === 'outlined' ? 'mixed' : variant}
	width={`calc(${SIZES[size] + 'px'} * 2 - 6px)` as WuiSize}
	{colorweight}
	{shape}
>
	<input {...rest} type="checkbox" {id} class="w-hidden" bind:this={_this} bind:checked />
	<span class="w-switch__thumb" style:transform="translateX({checked ? '100%' : '0'})"></span>
</LikeButton>

<style>
	:global(.w-switch) {
		display: inline-block;
		position: relative;
	}
	.w-switch__thumb {
		background-color: var(--w-clr-bg);
		border-radius: inherit;
		display: block;
		height: 100%;
		transition: all 0.15s ease-in-out;
		width: calc(100% / 2);
	}

	:global(.w-switch .w-switch__thumb) {
		background-color: var(--w-clr-fg);
	}
</style>

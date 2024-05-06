<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiDimension, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface SwitchAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		name?: string;
		required?: boolean;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	}

	const SIZES = {
		sm: 18,
		md: 22,
		lg: 26
	};
</script>

<script lang="ts">
	import './style.css';
	import { LikeButton } from '$lib/utils';

	let {
		_this = $bindable(),
		checked = $bindable(false),
		color = 'neutral',
		size = 'md',
		shape = 'pill',
		value,
		variant = 'outlined',
		...rest
	}: SwitchAttributes = $props();

	const width = `calc(${SIZES[size] + 'px'} * 2 - 6px)` as WuiDimension;
	const id = Math.random().toString(36);

	if (shape === 'circle') {
		shape = 'pill';
	}
</script>

<LikeButton
	color={checked ? (color === 'neutral' ? 'primary' : color) : 'neutral'}
	class="WuiSwitch"
	element="label"
	for={id}
	height={SIZES[size]}
	p={2}
	style="display:inline-block;position:relative"
	variant={checked && variant === 'outlined' ? 'mixed' : variant}
	{shape}
	{width}
>
	<input {...rest} type="checkbox" {id} class="WuiHidden" bind:this={_this} bind:checked />
	<span class="WuiSwitch__thumb" style:transform="translateX({checked ? '100%' : '0'})"></span>
</LikeButton>

<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface SwitchAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		name?: string;
		required?: boolean;
		size?: WuiSize;
		shape?: Omit<WuiShape, 'circle'>;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { LikeButton } from '$lib/utils';

	const id = Math.random().toString(36);

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
</script>

<LikeButton
	color={checked ? color : 'neutral'}
	class="WuiSwitch"
	element="label"
	for={id}
	height="var(--WuiSwitch-size-{size})"
	style="display:inline-block;position:relative"
	width="calc(var(--WuiSwitch-size-{size}) * 2 - 6px)"
	p={2}
	{shape}
	{variant}
>
	<input {...rest} type="checkbox" {id} class="WuiHidden" bind:this={_this} bind:checked />
	<span
		class="WuiSwitch__thumb"
		style:height="calc(var(--WuiSwitch-size-{size}) - 6px)"
		style:width="calc(var(--WuiSwitch-size-{size}) - 6px)"
		style:transform="translateX({checked ? '100%' : '0'})"
		style:transition="transform 0.1s ease-in-out"
		style:display="block"
		style:border-radius="inherit"
	></span>
</LikeButton>

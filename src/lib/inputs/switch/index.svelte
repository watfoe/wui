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

<div
	class="
	WuiSwitch WuiSwitch--{size}
	WuiSurface WuiSurface--{variant}
	WuiSurface--{checked ? color : 'neutral'}
	WuiSurface--{shape} WuiSurface--clickable"
>
	<input {...rest} type="checkbox" {id} class="WuiSwitch__input" bind:this={_this} bind:checked />
	<label class="WuiSwitch__label WuiSurface--wid-full WuiSurface--hgt-full" for={id} />
</div>

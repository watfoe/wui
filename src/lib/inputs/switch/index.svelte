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

<label
	class="
	WuiSwitch WuiSwitch--{size}
	WuiVariant-{variant}
	WuiColor-{checked ? color : 'neutral'}
	WuiShape-{shape} WuiClickable"
	for={id}
>
	<input {...rest} type="checkbox" {id} class="WuiHidden" bind:this={_this} bind:checked />
</label>

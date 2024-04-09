<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	export interface CheckBoxAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		class?: string;
		color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
		label: string;
		name?: string;
		required?: boolean;
		size?: 'sm' | 'md' | 'lg';
	}
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';

	let {
		_this = $bindable(),
		color = 'neutral',
		checked = $bindable(false),
		label,
		size = 'md',
		...rest
	}: CheckBoxAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<div class="WuiCheckbox WuiCheckbox--{size} WuiCheckbox--{color}">
	<input {...rest} type="checkbox" class="WuiCheckbox__input" {id} bind:this={_this} bind:checked />

	<Text
		variant="label"
		{size}
		color={color === 'neutral' ? 'black' : color}
		for={id}
		class="WuiCheckbox__label"
	>
		<Icon {size} class="WuiCheckbox__thumb">check</Icon>
		{label}
	</Text>
</div>

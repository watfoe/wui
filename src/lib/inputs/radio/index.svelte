<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	export interface RadioAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		class?: string;
		color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
		label: string;
		name?: string;
		required?: boolean;
		value?: string;
		size?: 'sm' | 'md' | 'lg';
	}
</script>

<script lang="ts">
	import './style.css';
	import { Text } from '$lib/typography';

	let {
		_this = $bindable(),
		color = 'neutral',
		label,
		size = 'md',
		value = $bindable(),
		...rest
	}: RadioAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<div role="radio" class="WuiRadio WuiRadio--{size} WuiRadio--{color}">
	<input {...rest} type="radio" class="WuiRadio__input" {id} bind:this={_this} bind:value />

	<Text
		variant="label"
		size="lg"
		color={color === 'neutral' ? 'black' : color}
		for={id}
		class="WuiRadio__label"
	>
		<span class="WuiRadio__thumb" />
		{label}
	</Text>
</div>

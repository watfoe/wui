<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface RadioAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		label: string;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Text } from '$lib/typography';
	import { LikeButton } from '$lib/utils';

	let {
		_this = $bindable(),
		checked = $bindable(),
		color = 'primary',
		label,
		size = 'md',
		shape = 'circle',
		variant = 'outlined',
		value = $bindable(),
		onchange,
		...rest
	}: RadioAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<div class="WuiRadio WuiRadio--{size} WuiRadio--{color}">
	<input {...rest} type="radio" class="WuiRadio__input" {id} bind:this={_this} bind:value />

	<Text variant="label" {size} for={id} class="WuiRadio__label">
		<LikeButton element="span" {color} {variant} {shape} size="sm" class="WuiRadio__thumb" />
		{#if $$slots.label}
			<slot name="label" />
		{:else}
			{label}
		{/if}
	</Text>
</div>

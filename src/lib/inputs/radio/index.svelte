<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiSpacing, WuiVariant } from '$lib/types';

	export interface RadioAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		gap?: WuiSpacing;
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
	import { getContext } from 'svelte';

	let {
		_this = $bindable(),
		checked = $bindable(),
		color,
		gap = 'sm',
		label,
		name,
		size,
		shape,
		variant,
		value = $bindable(),
		onchange,
		...rest
	}: RadioAttributes = $props();

	const ctx: {
		color: WuiColor;
		name: string;
		size: WuiSize;
		shape: WuiShape;
		variant: WuiVariant;
	} = getContext('wui-radio-group-ctx') || {};

	const id = Math.random().toString(36).substring(2, 15);
</script>

<Text
	variant="label"
	{size}
	for={id}
	class="WuiRadio WuiClickable WuiGap-{gap} WuiRadio--{size || ctx.size || 'md'}"
>
	<input
		{...rest}
		type="radio"
		class="WuiHidden"
		{id}
		name={name || ctx.name}
		bind:this={_this}
		bind:value
	/>

	<LikeButton
		element="span"
		color={color || ctx.color || 'primary'}
		variant={variant || ctx.variant || 'outlined'}
		shape={shape || ctx.shape || 'circle'}
		size="sm"
		class="WuiRadio__thumb"
	/>

	{#if $$slots.label}
		<slot name="label" />
	{:else}
		{label}
	{/if}
</Text>

<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiSpacing, WuiVariant } from '$lib/types';

	export interface RadioAttributes extends Omit<HTMLInputAttributes, 'size'> {
		checkbox?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		gap?: WuiSpacing;
		label: Snippet | string;
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
	import { Text } from '$lib/typography';
	import { LikeButton } from '$lib/utils';
	import { getContext, type Snippet } from 'svelte';

	let {
		checkbox = $bindable(),
		checked = $bindable(),
		color,
		gap = 'sm',
		label,
		name,
		size = 'md',
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

<Text variant="label" {size} for={id} class="WuiRadio WuiClickable" style="gap:var(--space-{gap});">
	<input
		{...rest}
		class="WuiHidden"
		{checked}
		name={name || ctx.name}
		type="radio"
		bind:this={checkbox}
		bind:value
		{id}
	/>

	<LikeButton
		element="span"
		color={color || ctx.color || 'primary'}
		class="WuiRadio__thumb"
		p={2}
		shape={shape || ctx.shape || 'circle'}
		variant={variant || ctx.variant || 'outlined'}
		height={SIZES[size || ctx.size || 'md']}
		width={SIZES[size || ctx.size || 'md']}
	/>

	{#if typeof label === 'string'}
		{label}
	{:else}
		{@render label()}
	{/if}
</Text>

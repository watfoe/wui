<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type {
		WuiColor,
		WuiDimension,
		WuiShape,
		WuiSize,
		WuiSpacing,
		WuiVariant
	} from '$lib/types';

	export interface RadioAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		gap?: WuiSpacing;
		label: Snippet | string;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Text } from '$lib/typography';
	import { LikeButton } from '$lib/utils';
	import { getContext, type Snippet } from 'svelte';

	let {
		_this = $bindable(),
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

	const height = `var(--WuiRadio-size-${size || ctx.size || 'md'})` as WuiDimension;
	const width = `var(--WuiRadio-size-${size || ctx.size || 'md'})` as WuiDimension;

	const id = Math.random().toString(36).substring(2, 15);
</script>

<Text variant="label" {size} for={id} class="WuiRadio WuiClickable" style="gap:var(--space-{gap});">
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
		class="WuiRadio__thumb"
		{height}
		p={2}
		shape={shape || ctx.shape || 'circle'}
		variant={variant || ctx.variant || 'outlined'}
		{width}
	/>

	{#if typeof label === 'string'}
		{label}
	{:else}
		{@render label()}
	{/if}
</Text>

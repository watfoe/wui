<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiSpacing, WuiVariant } from '$lib/types';
	export interface CheckboxAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: WuiColor;
		label: string;
		gap?: WuiSpacing;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';
	import { LikeButton } from '$lib/utils';
	import { getContext } from 'svelte';

	let {
		_this = $bindable(),
		checked = $bindable(false),
		color,
		label,
		gap = 'sm',
		name,
		size,
		shape,
		variant,
		...rest
	}: CheckboxAttributes = $props();

	const ctx: {
		color: WuiColor;
		name: string;
		size: WuiSize;
		shape: WuiShape;
		variant: WuiVariant;
	} = getContext('wui-checkbox-group-ctx') || {};

	const id = Math.random().toString(36).substring(2, 15);
</script>

<Text
	role="checkbox"
	aria-checked={checked}
	aria-label={label}
	variant="label"
	size={size || ctx.size || 'md'}
	for={id}
	class="WuiCheckbox WuiCheckbox--{size || ctx.size || 'md'} WuiGap-{gap}"
>
	<input
		{...rest}
		tabindex="-1"
		type="checkbox"
		class="WuiHidden"
		{id}
		name={name || ctx.name}
		bind:this={_this}
		bind:checked
	/>

	<LikeButton
		element="span"
		color={checked ? color || ctx.color || 'primary' : 'neutral'}
		variant={variant || ctx.variant || 'outlined'}
		shape={shape || ctx.shape || 'rounded'}
		size="sm"
		class="WuiCheckbox__thumb"
	>
		<Icon {size} weight="500" slot="prefix">check</Icon>
	</LikeButton>

	{#if $$slots.label}
		<slot name="label" />
	{:else}
		{label}
	{/if}
</Text>

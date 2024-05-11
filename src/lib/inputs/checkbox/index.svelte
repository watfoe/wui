<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiSpacing, WuiVariant } from '$lib/types';
	export interface CheckboxAttributes extends Omit<HTMLInputAttributes, 'size'> {
		checked?: boolean;
		color?: WuiColor;
		label: Snippet | string;
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
	import { getContext, type Snippet } from 'svelte';

	let {
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

	const SIZES = {
		sm: 18,
		md: 22,
		lg: 26
	};
</script>

<Text
	role="checkbox"
	aria-checked={checked}
	aria-label={typeof label === 'string' ? label : rest['aria-label']}
	variant="label"
	size={size || ctx.size || 'md'}
	for={id}
	class="WuiCheckbox"
	style="gap:var(--space-{gap});"
>
	<input
		{...rest}
		class="WuiHidden"
		name={name || ctx.name}
		tabindex="-1"
		type="checkbox"
		bind:checked
		{id}
	/>

	<LikeButton
		element="span"
		class="WuiCheckbox__thumb"
		color={checked ? color || ctx.color || 'primary' : 'neutral'}
		shape={shape || ctx.shape || 'rounded'}
		variant={variant || ctx.variant || 'outlined'}
		height={SIZES[size || ctx.size || 'md']}
		width={SIZES[size || ctx.size || 'md']}
	>
		{#snippet prefix()}
			<Icon {size} weight="500">check</Icon>
		{/snippet}
	</LikeButton>

	{#if typeof label === 'string'}
		{label}
	{:else}
		{@render label()}
	{/if}
</Text>

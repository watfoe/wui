<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiSpacing, WuiVariant } from '$lib/types';
	export interface CheckBoxAttributes extends Omit<HTMLInputAttributes, 'size'> {
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

	let {
		_this = $bindable(),
		checked = $bindable(false),
		color = 'black',
		label,
		gap = 'md',
		size = 'md',
		shape = 'rounded',
		variant = 'outlined',
		...rest
	}: CheckBoxAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<Text
	role="checkbox"
	aria-checked={checked}
	aria-label={label}
	variant="label"
	{size}
	for={id}
	class="WuiCheckbox WuiCheckbox--{size} WuiGap-{gap}"
>
	<input
		{...rest}
		tabindex="-1"
		type="checkbox"
		class="WuiHidden"
		{id}
		bind:this={_this}
		bind:checked
	/>

	<LikeButton
		element="span"
		color={checked ? color : 'neutral'}
		{variant}
		{shape}
		size="sm"
		class="WuiCheckbox__thumb"
	>
		<Icon {size} slot="prefix">check</Icon>
	</LikeButton>

	{#if $$slots.label}
		<slot name="label" />
	{:else}
		{label}
	{/if}
</Text>

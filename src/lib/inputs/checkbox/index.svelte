<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	export interface CheckBoxAttributes extends Omit<HTMLInputAttributes, 'size'> {
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
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';
	import { LikeButton } from '$lib/utils';

	let {
		_this = $bindable(),
		checked = $bindable(false),
		color = 'black',
		label,
		size = 'md',
		shape = 'rounded',
		variant = 'outlined',
		...rest
	}: CheckBoxAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<div
	role="checkbox"
	aria-checked={checked}
	aria-label={label}
	class="WuiCheckbox WuiCheckbox--{size}"
>
	<input
		{...rest}
		tabindex="-1"
		type="checkbox"
		class="WuiCheckbox__input"
		{id}
		bind:this={_this}
		bind:checked
	/>

	<Text variant="label" {size} for={id} class="WuiCheckbox__label">
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
</div>

<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	export interface CheckBoxAttributes extends Omit<HTMLInputAttributes, 'size'> {
		_this?: HTMLInputElement;
		checked?: boolean;
		color?: LikeButtonAttributes<HTMLSpanElement>['color'];
		label: string;
		size?: LikeButtonAttributes<HTMLSpanElement>['size'];
		variant?: LikeButtonAttributes<HTMLSpanElement>['variant'];
	}
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';
	import { LikeButton, type LikeButtonAttributes } from '$lib/utils';

	let {
		_this = $bindable(),
		color = 'neutral',
		checked = $bindable(false),
		label,
		size = 'md',
		variant = 'outline',
		...rest
	}: CheckBoxAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<div
	role="checkbox"
	aria-checked={checked}
	aria-label={label}
	class="WuiCheckbox WuiCheckbox--{size} WuiCheckbox--{color}"
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

	<Text
		variant="label"
		{size}
		color={color === 'neutral' ? 'black' : color}
		for={id}
		class="WuiCheckbox__label"
	>
		<LikeButton element="span" {color} {variant} size="sm" class="WuiCheckbox__thumb">
			<Icon {size} slot="prefix">check</Icon>
		</LikeButton>
		{label}
	</Text>
</div>

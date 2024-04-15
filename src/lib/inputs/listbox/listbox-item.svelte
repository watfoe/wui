<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import { getContext, untrack } from 'svelte';

	export interface ListboxItemAttributes
		extends Omit<LikeButtonAttributes<HTMLLabelElement, HTMLLabelAttributes>, '_this'> {
		_this?: HTMLInputElement;
		role?: 'listitem' | 'option';
		selected?: boolean;
		value?: string;
	}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '$lib/utils';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let {
		_this = $bindable(),
		color,
		role = 'listitem',
		selected = $bindable(false),
		shape,
		size,
		value = $bindable(),
		variant,
		...rest
	}: ListboxItemAttributes = $props();

	let _checked = $state(selected);

	const id = Math.random().toString(36).substring(2, 15);
	const context: {
		color: WuiColor;
		name: string;
		multiple: boolean;
		size: WuiSize;
		shape: WuiShape;
		variant: WuiVariant;
	} = getContext('wui-listbox-ctx') || {};

	$effect(() => {
		untrack(() => {
			if (_checked && value) {
				// Without the timeout, the event is dispatched but the listener has not yet been registered.
				setTimeout(() => {
					_this?.dispatchEvent(new Event('change', { bubbles: true }));
				}, 0);
			}
		});
	});

	function keydown(e: KeyboardEvent) {
		if (_this && (e.key === 'Enter' || e.key === ' ')) {
			if (context.multiple) {
				_this.click();
			} else if (!_checked) {
				_this.click();
			}
		}
	}
</script>

<LikeButton
	{...rest}
	element="label"
	for={id}
	aria-selected={_checked}
	navigation="vertical"
	variant={_checked ? variant || context.variant || 'soft' : 'plain'}
	color={_checked ? color || context.color || 'primary' : 'neutral'}
	size={size || context.size || 'md'}
	shape={shape || context.shape || 'square'}
	justify="flex-start"
	class="WuiListbox__item"
	onkeydown={keydown}
>
	<input
		type="checkbox"
		tabindex="-1"
		class="WuiHidden"
		{id}
		{value}
		name={context.name}
		bind:checked={_checked}
		bind:this={_this}
	/>

	<slot />
</LikeButton>

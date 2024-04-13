<script lang="ts" context="module">
	import { Button, type ButtonAttributes } from '$lib/buttons';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import { getContext, untrack } from 'svelte';

	export interface ListboxItemAttributes extends ButtonAttributes {
		selected?: boolean;
		role?: 'listitem' | 'option';
		value?: string;
	}
</script>

<script lang="ts">
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
			if (selected && value) {
				// Without the timeout, the event is dispatched but the listener has not yet been registered.
				setTimeout(() => {
					_this?.click();
				}, 0);
			}
		});
	});

	function click(e: MouseEvent) {
		(_this?.firstElementChild as HTMLInputElement).click();
	}
</script>

<Button
	aria-selected={selected}
	navigation="vertical"
	variant={selected ? variant || context.variant || 'soft' : 'plain'}
	color={selected ? color || context.color || 'primary' : 'neutral'}
	size={size || context.size || 'md'}
	shape={shape || context.shape || 'square'}
	justify="flex-start"
	class="WuiListbox__item"
	onclick={click}
	bind:_this
>
	<input
		type="checkbox"
		class="WuiListbox__item--hidden"
		{id}
		{value}
		name={context.name}
		bind:checked={selected}
		tabindex="-1"
	/>

	<slot name="prefix" />
	<slot />
</Button>

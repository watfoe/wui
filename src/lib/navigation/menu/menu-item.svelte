<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	export interface MenuItemAttributes extends ButtonAttributes {
		selected?: boolean;
	}
</script>

<script lang="ts">
	import { Button, type ButtonAttributes } from '$lib/buttons';
	import { getContext, untrack } from 'svelte';

	let {
		_this = $bindable(),
		color,
		role = 'listitem',
		selected = false,
		size,
		shape,
		variant,
		...rest
	}: MenuItemAttributes = $props();
	let context: {
		color?: WuiColor;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	} = getContext('wui-tab-ctx') || {};

	const altColor =
		(color || context.color) === 'primary' ? 'neutral' : color || context.color || 'neutral';

	$effect.pre(() => {
		untrack(() => {
			if (shape === 'circle') {
				shape = 'pill';
			}
		});
	});
</script>

<Button
	bold={false}
	{...rest}
	aria-selected={selected}
	role="menuitem"
	navigation="vertical"
	variant={selected ? variant || context.variant || 'soft' : 'plain'}
	color={color || (selected ? context.color || 'primary' : altColor)}
	size={size || context.size || 'md'}
	shape={shape || context.shape || 'square'}
	justify="flex-start"
	width="full"
	class="WuiMenu__item"
	bind:_this
>
	<slot />
</Button>

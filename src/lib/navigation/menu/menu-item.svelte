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
	aria-selected={selected}
	class="WuiMenu__item"
	color={color || (selected ? context.color || 'primary' : altColor)}
	justify="flex-start"
	navigation="vertical"
	role="menuitem"
	size={size || context.size || 'md'}
	shape={shape || context.shape || 'square'}
	variant={selected ? variant || context.variant || 'soft' : 'plain'}
	width="100%"
	{...rest}
/>

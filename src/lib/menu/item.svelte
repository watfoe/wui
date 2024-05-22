<script lang="ts" context="module">
	import type { WuiColor, WuiFlexDirection, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	export interface MenuItemAttributes extends ButtonAttributes {
		selected?: boolean;
	}
</script>

<script lang="ts">
	import { Button, type ButtonAttributes } from '../button';
	import { getContext } from 'svelte';

	let {
		color,
		justify,
		navigation,
		role = 'listitem',
		selected = false,
		size,
		shape,
		style = '',
		variant,
		width,
		...rest
	}: MenuItemAttributes = $props();

	let ctx: {
		color?: WuiColor;
		direction: WuiFlexDirection;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	} = getContext('wui-menu-ctx') || {};

	const altColor = (color || ctx.color) === 'primary' ? 'neutral' : color || ctx.color || 'neutral';

	if (shape === 'circle') {
		shape = 'pill';
	}
</script>

<Button
	aria-selected={selected}
	color={color || ctx.color || (selected ? 'primary' : altColor)}
	justify={justify || (ctx.direction === 'row' ? 'center' : 'flex-start')}
	navigation={navigation || (ctx.direction === 'row' ? 'horizontal' : 'vertical')}
	role="menuitem"
	size={size || ctx.size || 'md'}
	shape={shape || ctx.shape || 'rounded'}
	style="flex-shrink:0;{style}"
	variant={variant || ctx.variant || (selected ? 'soft' : 'plain')}
	width={width || (ctx.direction === 'row' ? undefined : '100%')}
	{...rest}
/>

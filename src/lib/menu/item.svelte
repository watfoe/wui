<script lang="ts" module>
	import type { WuiColor, WuiFlexDirection, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	export interface MenuItemAttributes extends Omit<LikeButtonAttributes<'li'>, 'element'> {
		selected?: boolean;
	}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';
	import { getContext } from 'svelte';

	let {
		color,
		justify,
		navigation,
		px = 'sm',
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

	const altColor = (color || ctx.color) === 'primary' ? 'black' : color || ctx.color || 'black';

	if (shape === 'circle') {
		shape = 'pill';
	}
</script>

<LikeButton
	element="li"
	aria-selected={selected}
	color={color || ctx.color || (selected ? 'primary' : altColor)}
	justify={justify || (ctx.direction === 'row' ? 'center' : 'start')}
	navigation={navigation || (ctx.direction === 'row' ? 'horizontal' : 'vertical')}
	role="menuitem"
	size={size || ctx.size || 'md'}
	shape={shape || ctx.shape || 'rounded'}
	style="flex-shrink:0;{style}"
	variant={variant || ctx.variant || (selected ? 'soft' : 'plain')}
	width={width || (ctx.direction === 'row' ? undefined : '100%')}
	{px}
	{...rest}
/>

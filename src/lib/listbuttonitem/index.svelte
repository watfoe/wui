<script lang="ts" module>
	import type { WuiColor, WuiFlexDirection, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface ListButtonItemAttributes extends Omit<LikeButtonAttributes<'li'>, 'element'> {
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
		px = 'md',
		size,
		shape,
		selected = $bindable(false),
		variant,
		width,
		...rest
	}: ListButtonItemAttributes = $props();
	let ctx: {
		color?: WuiColor;
		direction?: WuiFlexDirection;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	} = getContext('wui-list-ctx') || {};

	const altColor = (color || ctx.color) === 'primary' ? 'neutral' : color || ctx.color || 'neutral';
</script>

<LikeButton
	element="li"
	aria-selected={selected}
	tabindex={0}
	color={color || ctx.color || (selected ? 'neutral' : altColor)}
	justify={justify || (ctx.direction === 'row' ? 'center' : 'start')}
	navigation={navigation || (ctx.direction === 'row' ? 'horizontal' : 'vertical')}
	size={size || ctx.size || 'md'}
	shape={shape || ctx.shape || 'sharp'}
	variant={variant || ctx.variant || (selected ? 'soft' : 'plain')}
	width={width || (ctx.direction === 'row' ? undefined : '100%')}
	{px}
	{...rest}
/>

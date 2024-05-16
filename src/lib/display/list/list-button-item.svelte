<script lang="ts" context="module">
	import type { HTMLLiAttributes } from 'svelte/elements';
	import type { WuiColor, WuiFlexDirection, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface ListButtonItemAttributes
		extends Omit<LikeButtonAttributes<HTMLLiAttributes>, 'element'> {
		selected?: boolean;
	}
</script>

<script lang="ts">
	import LikeButton, { type LikeButtonAttributes } from '$lib/utils/likebutton/index.svelte';
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
	element="div"
	aria-selected={selected}
	tabindex="0"
	color={color || ctx.color || (selected ? 'neutral' : altColor)}
	justify={justify || (ctx.direction === 'row' ? 'center' : 'flex-start')}
	navigation={navigation || (ctx.direction === 'row' ? 'horizontal' : 'vertical')}
	size={size || ctx.size || 'md'}
	shape={shape || ctx.shape || 'square'}
	variant={variant || ctx.variant || (selected ? 'soft' : 'plain')}
	width={width || (ctx.direction === 'row' ? undefined : '100%')}
	{px}
	{...rest}
/>

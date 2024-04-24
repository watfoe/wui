<script lang="ts" context="module">
	import { type LikeButtonAttributes } from '$lib/utils';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface ListButtonItemAttributes
		extends Omit<LikeButtonAttributes<HTMLLiAttributes>, 'element'> {
		selected?: boolean;
	}
</script>

<script lang="ts">
	import { LikeButton } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { WuiColor, WuiFlexDirection, WuiShape, WuiSize, WuiVariant } from '$lib/types';

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
	} = getContext('wui-tab-ctx') || {};

	const altColor = (color || ctx.color) === 'primary' ? 'neutral' : color || ctx.color || 'neutral';
</script>

<LikeButton
	element="li"
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

<script lang="ts" context="module">
	import { type LikeButtonAttributes } from '$lib/utils';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface ListButtonItemAttributes
		extends Omit<LikeButtonAttributes<HTMLLIElement, HTMLLiAttributes>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	let { color, size, shape, variant, ...rest }: ListButtonItemAttributes = $props();
	let context: {
		color?: WuiColor;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
		orientation?: 'horizontal' | 'vertical';
	} = getContext('wui-tab-ctx') || {};

	color = color || context.color || 'neutral';
	size = size || context.size || 'md';
	shape = shape || context.shape || 'square';
	variant = variant || context.variant || 'plain';
</script>

<LikeButton
	{...rest}
	element="li"
	navigation={context.orientation || 'vertical'}
	tabindex="0"
	justify="flex-start"
	{color}
	{size}
	{shape}
	{variant}
>
	<slot />
</LikeButton>

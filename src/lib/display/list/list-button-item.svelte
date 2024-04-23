<script lang="ts" context="module">
	import { type LikeButtonAttributes } from '$lib/utils';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface ListButtonItemAttributes
		extends Omit<LikeButtonAttributes<HTMLLiAttributes>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	let { color, size, shape, variant, px = 'md', ...rest }: ListButtonItemAttributes = $props();
	let ctx: {
		color?: WuiColor;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
		orientation?: 'horizontal' | 'vertical';
	} = getContext('wui-tab-ctx') || {};
</script>

<LikeButton
	{...rest}
	element="li"
	navigation={ctx.orientation || 'vertical'}
	tabindex="0"
	justify="flex-start"
	color={color || ctx.color || 'neutral'}
	{px}
	size={size || ctx.size || 'md'}
	shape={shape || ctx.shape || 'square'}
	variant={variant || ctx.variant || 'plain'}
	width={ctx.orientation === 'vertical' ? '100%' : undefined}
/>

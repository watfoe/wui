<script lang="ts" context="module">
	import type {
		WuiColor,
		WuiDimension,
		WuiFlexDirection,
		WuiListMarker,
		WuiShape,
		WuiSize,
		WuiVariant
	} from '$lib/types';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface ListItemAttributes extends SurfaceAttributes<HTMLLiAttributes> {
		color?: WuiColor;
		size?: WuiSize;
		marker?: WuiListMarker;
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { Surface, type SurfaceAttributes } from '$lib/utils';

	let {
		color,
		height,
		marker,
		style = '',
		size,
		shape,
		variant,
		width,
		...rest
	}: ListItemAttributes = $props();
	let ctx: {
		color?: WuiColor;
		direction: WuiFlexDirection;
		marker?: WuiListMarker;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	} = getContext('wui-list-ctx') || {};

	height = height || ((size || ctx.size) as WuiDimension);
</script>

<Surface
	element="li"
	class="WuiListItem"
	color={color || ctx.color || 'black'}
	shape={shape || ctx.shape}
	style="list-style-type:{marker || ctx.marker || 'circle'};{style}"
	variant={variant || ctx.variant}
	width={ctx.direction === 'row' ? undefined : '100%'}
	{height}
	{...rest}
/>

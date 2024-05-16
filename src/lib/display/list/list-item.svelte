<script lang="ts" context="module">
	import type { HTMLLiAttributes } from 'svelte/elements';
	import type {
		WuiColor,
		WuiDimension,
		WuiFlexDirection,
		WuiListMarker,
		WuiShape,
		WuiSize,
		WuiVariant
	} from '$lib/types';

	export interface ListItemAttributes extends Omit<SurfaceAttributes<HTMLLiAttributes>, 'element'> {
		color?: WuiColor;
		size?: WuiSize;
		marker?: WuiListMarker;
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import Surface, { type SurfaceAttributes } from '$lib/utils/surface/index.svelte';

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

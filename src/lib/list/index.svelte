<script lang="ts" module>
	import { type SurfaceAttributes } from '../surface';
	import type { WuiColor, WuiListMarker, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface ListAttributes extends Omit<SurfaceAttributes<'ul'>, 'element'> {
		itemcolor?: WuiColor;
		itemshape?: WuiShape;
		itemsize?: WuiSize;
		itemvariant?: WuiVariant;
		marker?: WuiListMarker;
		orientation?: 'horizontal' | 'vertical';
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { Surface } from '../surface';

	let {
		color = 'neutral',
		direction = 'column',
		itemcolor,
		itemshape,
		itemsize,
		itemvariant,
		marker,
		shape,
		...rest
	}: ListAttributes = $props();

	if (shape === 'circle' || shape === 'pill') {
		shape = 'rounded';
	}

	setContext('wui-list-ctx', {
		color: itemcolor || color,
		direction,
		marker,
		shape: itemshape || shape,
		size: itemsize,
		variant: itemvariant
	});
</script>

<Surface element="ul" items="start" justify="start" {color} {shape} {direction} {...rest} />

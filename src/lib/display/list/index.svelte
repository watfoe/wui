<script lang="ts" context="module">
	import { type SurfaceAttributes } from '$lib/utils/surface/index.svelte';
	import type { WuiColor, WuiListMarker, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface ListAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {
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
	import type { HTMLAttributes } from 'svelte/elements';
	import Flex from '$lib/layout/flex/index.svelte';

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

<Flex align="flex-start" justify="flex-start" {color} {shape} {direction} {...rest} />

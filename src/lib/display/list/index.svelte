<script lang="ts" context="module">
	import type { SurfaceAttributes } from '$lib/utils';
	import { Flex } from '$lib/layout';
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

	let {
		direction = 'column',
		itemcolor,
		itemshape,
		itemsize,
		itemvariant,
		marker,
		shape,
		...rest
	}: ListAttributes = $props();

	$effect.pre(() => {
		if (shape === 'circle' || shape === 'pill') {
			shape = 'rounded';
		}
	});

	setContext('wui-tab-ctx', {
		color: itemcolor,
		direction,
		marker,
		shape: itemshape,
		size: itemsize,
		variant: itemvariant
	});
</script>

<Flex {...rest} align="flex-start" justify="flex-start" {shape} {direction} />

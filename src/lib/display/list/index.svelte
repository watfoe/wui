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
		children,
		itemcolor,
		itemshape,
		itemsize,
		itemvariant,
		marker,
		orientation = 'vertical',
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
		marker,
		shape: itemshape,
		size: itemsize,
		variant: itemvariant,
		orientation
	});
</script>

<Flex
	{...rest}
	align="flex-start"
	justify="flex-start"
	{shape}
	direction={orientation === 'horizontal' ? 'row' : 'column'}
>
	{#if children}
		{@render children()}
	{/if}
</Flex>

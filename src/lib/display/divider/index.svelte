<script context="module" lang="ts">
	import {
		type WuiColor,
		type WuiDimension,
		type WuiMargin,
		type WuiShape,
		type WuiSize
	} from '$lib/types';

	export interface DividerAttributes extends WuiMargin {
		color?: WuiColor;
		height?: WuiDimension;
		size?: WuiSize | number;
		shape?: WuiShape;
		vertical?: boolean;
		width?: WuiDimension;
	}

	const SIZES = {
		sm: 1,
		md: 2,
		lg: 3
	};
</script>

<script lang="ts">
	import { Surface } from '$lib/utils';
	let {
		color = 'neutral',
		height,
		m,
		mx,
		my,
		size = 'sm',
		vertical = false,
		width,
		...rest
	}: DividerAttributes = $props();

	if (vertical) {
		height = height || '100%';
		width = width || (size ? SIZES[size] : SIZES['sm']);
	} else {
		height = height || (size ? SIZES[size] : SIZES['sm']);
		width = width || '100%';
	}

	let sizeIsNumber = typeof size === 'number';
</script>

<Surface
	role="separator"
	variant="solid"
	{color}
	mx={vertical ? mx || m : undefined}
	my={vertical ? undefined : my || m}
	{height}
	{width}
	{...rest}
/>

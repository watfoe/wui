<script context="module" lang="ts">
	import { type WuiColor, type WuiSize, type WuiSpacing } from '$lib/types';

	export interface DividerAttributes {
		color?: WuiColor;
		size?: WuiSize | number;
		spacing?: WuiSpacing | number;
		vertical?: boolean;
	}

	const SIZES = {
		sm: 1,
		md: 2,
		lg: 3
	};
</script>

<script lang="ts">
	let {
		color = 'neutral',
		size = 'sm',
		spacing = 'ss',
		vertical = false
	}: DividerAttributes = $props();
	import { Surface } from '$lib/utils';

	let sizeIsNumber = typeof size === 'number';
</script>

<Surface
	role="separator"
	variant="solid"
	{color}
	style={sizeIsNumber ? `--WuiDivider--size: ${size}px;` : ''}
	mx={vertical ? spacing : undefined}
	my={vertical ? undefined : spacing}
	height={vertical ? '100%' : SIZES[size] || size}
	width={vertical ? SIZES[size] || size : '100%'}
/>

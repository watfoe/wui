<script context="module" lang="ts">
	export interface ProgressAttributes
		extends Omit<SurfaceAttributes<'div'>, 'element' | 'shape' | 'width'> {
		shape?: 'circular' | 'linear';
		determinate?: boolean;
		size?: WuiSize;
		thickness?: WuiSize;
		value?: number;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Surface, type SurfaceAttributes } from '../surface';
	import type { WuiSize } from '$lib/types';

	let {
		color = 'primary',
		determinate = false,
		height,
		shape = 'circular',
		size = 'md',
		textcolor,
		thickness = 'md',
		value,
		variant = 'soft'
	}: ProgressAttributes = $props();
</script>

<Surface
	element="div"
	role="progressbar"
	class="w-loader w-loader--{shape} w-loader--{size} {determinate && shape === 'linear'
		? 'w-loader--determinate'
		: ''}"
	height={height ||
		(shape === 'circular'
			? `calc(var(--height-${size}) - ${variant === 'mixed' || variant === 'outlined' ? '6px' : '4px'})`
			: '100%')}
	textcolor={textcolor || (variant === 'soft' || variant === 'solid' ? color : undefined)}
	textcolorweight="6"
	color={variant === 'soft' ? 'neutral' : color}
	colorweight={variant === 'solid' ? '2' : undefined}
	width={height ||
		(shape === 'circular'
			? `calc(var(--height-${size}) - ${variant === 'mixed' || variant === 'outlined' ? '6px' : '4px'})`
			: '100%')}
	{variant}
/>

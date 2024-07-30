<script context="module" lang="ts">
	export interface ProgressAttributes extends Omit<SurfaceAttributes<'div'>, 'element' | 'shape'> {
		shape?: 'circular' | 'linear';
		determinate?: boolean;
		value?: number;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Surface, type SurfaceAttributes } from '../surface';

	let {
		color = 'primary',
		determinate = false,
		shape = 'circular',
		textcolor,
		value,
		variant = 'soft',
		...rest
	}: ProgressAttributes = $props();
</script>

<Surface
	element="div"
	role="progressbar"
	class="w-loader w-loader--{shape} {determinate && shape === 'linear'
		? 'w-loader--determinate'
		: ''}"
	textcolor={textcolor || (variant === 'soft' || variant === 'solid' ? color : undefined)}
	textcolorweight="5"
	color={variant === 'soft' ? 'neutral' : color}
	colorweight={variant === 'solid' ? '1' : undefined}
	{variant}
></Surface>

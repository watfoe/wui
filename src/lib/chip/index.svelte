<script context="module" lang="ts">
	export interface ChipAttributes extends Omit<LikeButtonAttributes<'div'>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';

	let {
		_this = $bindable(),
		height,
		px = 'sm',
		size = 'md',
		shape = 'pill',
		variant = 'outlined',
		...rest
	}: ChipAttributes = $props();

	const SIZES = {
		xs: 18,
		sm: 20,
		md: 24,
		lg: 28,
		xl: 34
	};
</script>

<LikeButton
	element="div"
	height={height || SIZES[size]}
	style="line-height:1"
	{px}
	{shape}
	{variant}
	{...rest}
	bind:_this
/>

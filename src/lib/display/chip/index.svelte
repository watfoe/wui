<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ChipAttributes
		extends Omit<LikeButtonAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {}
</script>

<script lang="ts">
	import LikeButton, { type LikeButtonAttributes } from '$lib/utils/likebutton/index.svelte';

	let {
		height,
		px = 'sm',
		size = 'md',
		shape = 'pill',
		variant = 'outlined',
		...rest
	}: ChipAttributes = $props();

	const SIZES = {
		sm: 18,
		md: 22,
		lg: 26
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
/>

<script context="module" lang="ts">
	import type { LikeButtonAttributes } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ChipAttributes
		extends Omit<LikeButtonAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton } from '$lib';

	let { height, px = 'xs', size = 'md', variant = 'outlined', ...rest }: ChipAttributes = $props();

	const SIZES = {
		sm: 18,
		md: 22,
		lg: 26
	};
</script>

<LikeButton element="div" height={height || SIZES[size]} {px} {variant} {...rest} />

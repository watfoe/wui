<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	export interface DividerAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element' | 'size'> {
		size?: number;
		vertical?: boolean;
	}
</script>

<script lang="ts">
	import Surface, { type SurfaceAttributes } from '$lib/utils/surface/index.svelte';

	let {
		color = 'neutral',
		height,
		m,
		mx,
		my,
		size = 1,
		vertical = false,
		width,
		...rest
	}: DividerAttributes = $props();

	// Parent containers with no explicit height will not render the divider

	if (vertical) {
		height = height || '100%';
		width = width || size;
	} else {
		height = height || size;
		width = width || '100%';
	}
</script>

<Surface
	mx={vertical ? mx || m : undefined}
	my={vertical ? undefined : my || m}
	role="separator"
	variant="solid"
	{color}
	{height}
	{width}
	{...rest}
/>

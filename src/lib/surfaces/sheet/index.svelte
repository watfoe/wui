<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WuiFlexGap, WuiFlexJustify, WuiHeight, WuiSurface } from '$lib/types';

	export interface SheetAttributes
		extends WuiSurface,
			Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
		_this?: HTMLDivElement;
		gap?: WuiFlexGap;
		height?: WuiHeight;
		justify?: WuiFlexJustify;
	}
</script>

<script lang="ts">
	let {
		_this = $bindable(),
		color = 'neutral',
		justify = 'center',
		gap = 'nm',
		height,
		variant = 'plain',
		shape = 'square',
		width,
		...rest
	}: SheetAttributes = $props();
</script>

<div
	{...rest}
	class="WuiSurface WuiSurface--{variant} WuiSurface--{color} WuiSurface--gap-{gap}
	{width ? 'WuiSurface--wid-' + width : ''}
	{height ? 'WuiSurface--hgt-' + height : ''}
	{rest.class || ''}"
	bind:this={_this}
>
	<slot />
</div>

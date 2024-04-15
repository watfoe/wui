<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WuiFlexJustify, WuiHeight, WuiSpacing, WuiSurface } from '$lib/types';

	export interface SheetAttributes
		extends WuiSurface,
			Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
		_this?: HTMLDivElement;
		pad?: WuiSpacing;
		padx?: WuiSpacing;
		pady?: WuiSpacing;
		height?: WuiHeight;
		justify?: WuiFlexJustify;
	}
</script>

<script lang="ts">
	let {
		_this = $bindable(),
		color = 'neutral',
		justify = 'center',
		pad = 'none',
		padx = pad,
		pady = pad,
		height,
		variant = 'plain',
		shape = 'rounded',
		width,
		...rest
	}: SheetAttributes = $props();
</script>

<div
	{...rest}
	class="
	WuiVariant-{variant} WuiColor-{color} WuiShape-{shape}
	WuiPadding-x-{padx} WuiPadding-y-{pady}
	{width ? 'WuiWidth-' + width : ''}
	{height ? 'WuiHeight-' + height : ''}
	{rest.class || ''}"
	bind:this={_this}
>
	<slot />
</div>

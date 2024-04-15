<script context="module" lang="ts">
	import type {
		WuiFlexAlign,
		WuiFlexDirection,
		WuiFlexJustify,
		WuiHeight,
		WuiSpacing,
		WuiWidth
	} from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface FlexKeys {
		_this?: HTMLDivElement;
		align?: WuiFlexAlign;
		direction?: WuiFlexDirection;
		justify?: WuiFlexJustify;
		gap?: WuiSpacing;
		height?: WuiHeight;
		wrap?: 'wrap' | 'nowrap';
		width?: WuiWidth;
	}

	export interface FlexAttributes extends HTMLAttributes<HTMLDivElement>, FlexKeys {}
</script>

<script lang="ts">
	let {
		_this = $bindable<HTMLDivElement>(),
		direction = 'row',
		justify = 'flex-start',
		align = 'center',
		wrap = 'nowrap',
		gap,
		width,
		height,
		...rest
	}: FlexAttributes = $props();
</script>

<div
	{...rest}
	class="
		WuiFlex
		{gap ? 'WuiGap-' + gap : ''}
		{width ? 'WuiWidth-' + width : ''}
		{height ? 'WuiHeight-' + height : ''}
		{rest.class || ''}"
	style="
    {rest.style || ''};
    --WuiFlex-direction:{direction};
    --WuiFlex-justify:{justify};
    --WuiFlex-align:{align};
    --WuiFlex-wrap:{wrap};
  "
	bind:this={_this}
>
	<slot />
</div>

<style>
	.WuiFlex {
		display: flex;
		flex-direction: var(--WuiFlex-direction, row);
		justify-content: var(--WuiFlex-justify, flex-start);
		align-items: var(--WuiFlex-align, flex-start);
		flex-wrap: var(--WuiFlex-wrap, nowrap);
	}
</style>

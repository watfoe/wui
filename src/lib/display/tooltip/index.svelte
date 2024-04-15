<!-- TODO: Should it be a popover instead of a tooltip? -->

<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSpacing, WuiVariant } from '$lib/types';
	import type { Snippet } from 'svelte';

	export interface TooltipAttributes {
		children?: Snippet;
		color?: WuiColor;
		title: string;
		pad?: WuiSpacing;
		padx?: WuiSpacing;
		pady?: WuiSpacing;
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-start'
			| 'top-end'
			| 'bottom-start'
			| 'bottom-end';
		shape?: WuiShape;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	let {
		color = 'neutral',
		title,
		pad = 'sm',
		padx,
		pady,
		position = 'bottom',
		shape = 'rounded',
		variant = 'solid'
	}: TooltipAttributes = $props();

	padx = padx || pad;
	pady = pady || pad;
</script>

<div class="WuiTooltip WuiTooltip-{position}">
	<slot />
	<span
		role="tooltip"
		class="
		WuiTooltip__content
		WuiText WuiText--body WuiText--sm
		WuiColor-{color} WuiVariant-{variant} WuiShape-{shape}
		{padx ? `WuiPadding-x-${padx}` : ''}
		{pady ? `WuiPadding-y-${pady}` : ''}"
	>
		{title}
	</span>
</div>

<style>
	.WuiTooltip {
		position: relative !important;
		display: inline-flex !important;
		justify-content: center !important;
		align-items: center !important;
		width: auto !important;
		z-index: 1000000;
	}
	.WuiTooltip .WuiTooltip__content {
		position: absolute;
		white-space: nowrap;
		display: none;
	}
	.WuiTooltip:hover .WuiTooltip__content {
		display: block;
	}
	.WuiTooltip-left .WuiTooltip__content {
		left: calc(100% + var(--space-xs));
		top: auto;
		bottom: auto;
	}
	.WuiTooltip-right .WuiTooltip__content {
		right: calc(100% + var(--space-xs));
		top: auto;
		bottom: auto;
	}
	.WuiTooltip-top .WuiTooltip__content {
		bottom: calc(100% + var(--space-xs));
		margin: 0 auto;
	}
	.WuiTooltip-bottom .WuiTooltip__content {
		top: calc(100% + var(--space-xs));
	}
	.WuiTooltip-top-start .WuiTooltip__content {
		bottom: calc(100% + var(--space-xs));
		left: 0;
	}
	.WuiTooltip-top-end .WuiTooltip__content {
		bottom: calc(100% + var(--space-xs));
		right: 0;
	}
	.WuiTooltip-bottom-start .WuiTooltip__content {
		top: calc(100% + var(--space-xs));
		left: 0;
	}
	.WuiTooltip-bottom-end .WuiTooltip__content {
		top: calc(100% + var(--space-xs));
		right: 0;
	}
</style>

<script context="module" lang="ts">
	import type { Snippet } from 'svelte';
	export interface TooltipAttributes {
		children: Snippet;
		title: string;
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right';
		variant?: 'solid' | 'outline' | 'plain' | 'soft';
	}
</script>

<script lang="ts">
	let { title, position = 'bottom', children } = $props<TooltipAttributes>();
</script>

<div
	aria-label={title}
	role="tooltip"
	class="WuiTooltip WuiTooltip-{position} "
	data-tooltip-title={title}
>
	{@render children()}
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
	.WuiTooltip::after {
		background-color: var(--color-black-1);
		color: var(--color-on-primary);
		border-radius: var(--radius);
		content: attr(data-tooltip-title);
		font-size: 0.74rem;
		position: absolute;
		padding: var(--space-nm) var(--space-sm);
		white-space: nowrap;
		display: none;
	}
	.WuiTooltip:hover::after {
		display: block;
	}
	.WuiTooltip-left::after {
		left: calc(100% + var(--space-xs));
		top: auto;
		bottom: auto;
	}
	.WuiTooltip-right::after {
		right: calc(100% + var(--space-xs));
		top: auto;
		bottom: auto;
	}
	.WuiTooltip-top::after {
		bottom: calc(100% + var(--space-xs));
		margin: 0 auto;
	}
	.WuiTooltip-bottom::after {
		top: calc(100% + var(--space-xs));
	}
	.WuiTooltip-top-left::after {
		bottom: calc(100% + var(--space-xs));
		left: 0;
	}
	.WuiTooltip-top-right::after {
		bottom: calc(100% + var(--space-xs));
		right: 0;
	}
	.WuiTooltip-bottom-left::after {
		top: calc(100% + var(--space-xs));
		left: 0;
	}
	.WuiTooltip-bottom-right::after {
		top: calc(100% + var(--space-xs));
		right: 0;
	}
</style>

<!-- TODO: Should it be a popover instead of a tooltip? -->

<script lang="ts" context="module">
	import { Surface } from '$lib/utils';
	import type { WuiColor, WuiShape, WuiSpacing, WuiVariant } from '$lib/types';
	import type { Snippet } from 'svelte';

	export interface TooltipAttributes {
		children?: Snippet;
		color?: WuiColor;
		title: Snippet | string;
		p?: WuiSpacing;
		px?: WuiSpacing;
		py?: WuiSpacing;
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
	import './style.css';

	let {
		children,
		color = 'black',
		p,
		px = 'sm',
		py = 'xs',
		position = 'bottom',
		shape = 'rounded',
		title,
		variant = 'solid'
	}: TooltipAttributes = $props();
</script>

<div class="WuiTooltip WuiTooltip-{position}">
	{#if children}
		{@render children()}
	{/if}
	<Surface
		element="span"
		role="tooltip"
		{p}
		{px}
		{py}
		{color}
		{shape}
		{variant}
		class="WuiTooltip__content WuiText--sm"
	>
		{#if typeof title === 'string'}
			{title}
		{:else}
			{@render title()}
		{/if}
	</Surface>
</div>

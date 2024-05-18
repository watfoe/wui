<!-- TODO: Should it be a popover instead of a tooltip? -->

<script lang="ts" context="module">
	import type { Snippet } from 'svelte';

	export interface TooltipAttributes
		extends Omit<SurfaceAttributes<Omit<HTMLAttributes<HTMLSpanElement>, 'title'>>, 'element'> {
		title: Snippet | string;
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'left-start'
			| 'left-end'
			| 'right'
			| 'right-start'
			| 'right-end'
			| 'top-start'
			| 'top-end'
			| 'bottom-start'
			| 'bottom-end';
	}
</script>

<script lang="ts">
	import './style.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import Surface, { type SurfaceAttributes } from '../surface';

	let {
		children,
		color = 'neutral',
		colorweight = '6',
		px = 'sm',
		py = 'xs',
		position = 'bottom',
		textsize = 'sm',
		title,
		shape = 'rounded',
		variant = 'outlined',
		...rest
	}: TooltipAttributes = $props();
</script>

<div class="w-tooltip w-tooltip-{position}">
	{#if children}
		{@render children()}
	{/if}
	<Surface
		element="span"
		role="tooltip"
		{color}
		{colorweight}
		{px}
		{py}
		{shape}
		{textsize}
		{variant}
		class="w-tooltip__content"
		{...rest}
	>
		{#if typeof title === 'string'}
			{title}
		{:else}
			{@render title()}
		{/if}
	</Surface>
</div>

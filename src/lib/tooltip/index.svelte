<!-- TODO: Should it be a popover instead of a tooltip? -->

<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface TooltipAttributes
		extends Omit<LikeButtonAttributes<'span'>, 'title' | 'element'> {
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
	import { LikeButton, type LikeButtonAttributes } from '$lib/likebutton';

	let {
		children,
		color = 'neutral',
		colorweight,
		px,
		position = 'bottom',
		size = 'sm',
		title,
		...rest
	}: TooltipAttributes = $props();
</script>

<div class="w-tooltip w-tooltip-{position}">
	{#if children}
		{@render children()}
	{/if}
	<LikeButton
		element="span"
		role="tooltip"
		colorweight={colorweight || color === 'neutral' ? '8' : undefined}
		px={px || size}
		{color}
		{size}
		class="w-tooltip__content"
		{...rest}
	>
		{#if typeof title === 'string'}
			{title}
		{:else}
			{@render title()}
		{/if}
	</LikeButton>
</div>

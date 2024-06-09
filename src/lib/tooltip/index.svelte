<!-- TODO: Should it be a popover instead of a tooltip? -->

<script lang="ts" context="module">
	import type { Snippet } from 'svelte';

	export interface TooltipAttributes
		extends Omit<LikeButtonAttributes<Omit<HTMLAttributes<HTMLSpanElement>, 'title'>>, 'element'> {
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
	import { LikeButton, type LikeButtonAttributes } from '$lib/likebutton';

	let {
		children,
		color = 'neutral',
		px = 'sm',
		position = 'bottom',
		textsize = 'sm',
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
		{color}
		{px}
		{size}
		{textsize}
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

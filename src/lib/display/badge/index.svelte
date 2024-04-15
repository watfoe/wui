<script context="module" lang="ts">
	import { type WuiColor, type WuiShape, type WuiVariant } from '$lib/types';
	import type { Snippet } from 'svelte';
	export interface BadgeAttributes {
		'aria-label'?: string;
		children: Snippet;
		content?: string | number;
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right';
		color?: WuiColor;
		max?: number;
		shape?: WuiShape;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import { Text } from '$lib/typography';
	let {
		content,
		position = 'top-right',
		color = 'primary',
		max,
		shape = 'pill',
		variant = 'solid',
		...rest
	}: BadgeAttributes = $props();
</script>

<div
	class="WuiBadge WuiBadge--{position} {!$$slots.content && !content ? 'WuiBadge--no-content' : ''}"
>
	<slot />

	<div
		aria-label={rest['aria-label'] || 'badge'}
		class="WuiBadge__content WuiVariant-{variant} WuiColor-{color} WuiShape-{shape}"
	>
		{#if $$slots.content}
			<slot name="content" />
		{:else if content}
			<Text variant="body" color="inherit" size="sm">
				{typeof !isNaN(Number(content)) && max
					? Number(content) > max
						? `${max}+`
						: content
					: content}
			</Text>
		{/if}
	</div>
</div>

<style>
	.WuiBadge {
		display: inline-flex !important;
		position: relative !important;
		--WuiBadge-height: 1rem;
		--WuiBadge-paddingX: var(--space-xs);
		--WuiBadge-radius: 1rem;
		--WuiBadge-translateX: 50%;
		--WuiBadge-translateY: -50%;
	}

	.WuiBadge--no-content {
		--WuiBadge-height: 0.75rem;
		--WuiBadge-paddingX: 0;
	}

	.WuiBadge__content {
		align-items: center;
		box-sizing: border-box;
		box-shadow: 0 0 0 2px;
		display: inline-flex;
		flex-wrap: wrap;
		place-content: center;
		position: absolute;
		padding: 0 var(--WuiBadge-paddingX);
		min-height: var(--WuiBadge-height);
		min-width: var(--WuiBadge-height);
		-webkit-transform: scale(1) translateX(var(--WuiBadge-translateX))
			translateY(var(--WuiBadge-translateY));
		-moz-transform: scale(1) translateX(var(--WuiBadge-translateX))
			translateY(var(--WuiBadge-translateY));
		-ms-transform: scale(1) translateX(var(--WuiBadge-translateX))
			translateY(var(--WuiBadge-translateY));
		transform: scale(1) translateX(var(--WuiBadge-translateX))
			translateY(var(--WuiBadge-translateY));
		transform-origin: 100% 0%;
		z-index: 10000;
	}

	.WuiBadge--top-left .WuiBadge__content {
		top: 0;
		left: 0;
		--WuiBadge-translateX: -50%;
		--WuiBadge-translateY: -50%;
	}
	.WuiBadge--top-right .WuiBadge__content {
		top: 0;
		right: 0;
		--WuiBadge-translateX: 50%;
		--WuiBadge-translateY: -50%;
	}
	.WuiBadge--bottom-left .WuiBadge__content {
		bottom: 0;
		left: 0;
		--WuiBadge-translateX: -50%;
		--WuiBadge-translateY: 50%;
	}
	.WuiBadge--bottom-right .WuiBadge__content {
		bottom: 0;
		right: 0;
		--WuiBadge-translateX: 50%;
		--WuiBadge-translateY: 50%;
	}
</style>

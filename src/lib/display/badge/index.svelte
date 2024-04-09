<script context="module" lang="ts">
	import { Text } from '$lib';
	import type { Snippet } from 'svelte';
	export interface BadgeAttributes {
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
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | string;
		max?: number;
	}
</script>

<script lang="ts">
	let { content, position = 'top-right', color = 'primary', max }: BadgeAttributes = $props();
</script>

<div
	aria-label="badge"
	class="WuiBadge WuiBadge--{position} {!$$slots.content && !content ? 'WuiBadge--no-content' : ''}"
>
	<slot />

	<div class="WuiBadge__content WuiBg-{color}">
		{#if $$slots.content}
			<slot name="content" />
		{:else if content}
			<Text variant="body">
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
		--WuiBadge-radius: 0.75rem;
	}

	.WuiBadge__content {
		align-items: center;
		border-radius: var(--WuiBadge-radius);
		box-sizing: border-box;
		box-shadow: 0 0 0 2px;
		display: inline-flex;
		flex-wrap: wrap;
		font-size: 0.75rem;
		-webkit-box-pack: center;
		place-content: center;
		-webkit-box-align: center;
		position: absolute;
		padding: 0 var(--WuiBadge-paddingX);
		min-height: var(--WuiBadge-height);
		line-height: 1.2;
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

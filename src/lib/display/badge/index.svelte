<script context="module" lang="ts">
	import { type WuiColor, type WuiShape, type WuiVariant } from '$lib/types';
	import type { Snippet } from 'svelte';
	export interface BadgeAttributes {
		'aria-label'?: string;
		children: Snippet;
		content?: Snippet | string | number;
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
	import './style.css';
	import { Text } from '$lib/typography';
	import { Surface } from '$lib/utils';
	let {
		content,
		children,
		position = 'top-right',
		color = 'primary',
		max,
		shape = 'pill',
		variant = 'solid',
		...rest
	}: BadgeAttributes = $props();
</script>

<div class="WuiBadge WuiBadge--{position}">
	{@render children()}

	<Surface
		aria-label={rest['aria-label'] || 'badge'}
		{variant}
		{color}
		{shape}
		px={!content ? undefined : 'xs'}
		wrap="wrap"
		class="WuiBadge__content"
	>
		{#if typeof content !== 'function'}
			<Text variant="body" color="inherit" size="sm">
				{typeof !isNaN(Number(content)) && max
					? Number(content) > max
						? `${max}+`
						: content
					: content}
			</Text>
		{:else}
			{@render content()}
		{/if}
	</Surface>
</div>

<script lang="ts" module>
	import { type WuiColor, type WuiShape, type WuiVariant } from '$lib/types';
	import type { Snippet } from 'svelte';
	export interface BadgeAttributes extends Omit<SurfaceAttributes<'div'>, 'element'> {
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
	import { Surface, type SurfaceAttributes } from '../surface';
	let {
		content,
		children,
		position = 'top-right',
		color = 'primary',
		max,
		shape = 'pill',
		style = '',
		textsize = 'sm',
		variant = 'solid',
		...rest
	}: BadgeAttributes = $props();
</script>

<div class="w-badge w-badge--{position}">
	{@render children()}

	<Surface
		aria-label={rest['aria-label'] || 'badge'}
		class="w-badge__content"
		element="div"
		px={!content ? undefined : typeof content === 'function' ? 1 : 'xs'}
		py={!content ? undefined : 1}
		style="line-height:1;{style}"
		wrap="wrap"
		{color}
		{shape}
		{textsize}
		{variant}
		{...rest}
	>
		{#if typeof content !== 'function'}
			{typeof !isNaN(Number(content)) && max
				? Number(content) > max
					? `${max}+`
					: content
				: content}
		{:else}
			{@render content()}
		{/if}
	</Surface>
</div>

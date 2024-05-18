<script context="module" lang="ts">
	import type { WuiColor, WuiSize, WuiTextWeight } from '$lib/types';
	import type { Snippet } from 'svelte';

	export interface IconAttributes {
		class?: string;
		children: Snippet;
		color?: WuiColor | 'inherit';
		fill?: boolean;
		grade?: number;
		size?: WuiSize;
		style?: string;
		weight?: WuiTextWeight;
	}
</script>

<script lang="ts">
	let {
		color = 'inherit',
		class: _class = '',
		children,
		fill = false,
		grade = 0,
		size = 'md',
		weight = '400',
		style = '',
		...rest
	}: IconAttributes = $props();

	const SIZES = {
		sm: '1.125rem',
		md: '1.25rem',
		lg: '1.5rem'
	};
</script>

<!-- Apply width to icon to avoid shifting -->
<span
	role="img"
	class="material-symbols-rounded w-icon {_class}"
	style="font-variation-settings: 'fill' {fill
		? 1
		: 0}, 'wght' {weight}, 'grad' {grade}, 'opsz' 48;--w-icon-size:{SIZES[size]};{style}"
	{...rest}
>
	{@render children()}
</span>

<style>
	.w-icon {
		font-family: 'Material Symbols Rounded';
		font-style: normal;
		font-size: var(--w-icon-size, 1.25rem);
		font-weight: normal;
		font-feature-settings: 'liga';
		display: inline-block;
		direction: ltr;
		line-height: 1;
		letter-spacing: normal;
		max-width: var(--w-icon-size, 1.25rem);
		text-transform: none;
		white-space: nowrap;
		word-wrap: normal;
		text-rendering: optimizeLegibility;
		overflow-x: hidden;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>

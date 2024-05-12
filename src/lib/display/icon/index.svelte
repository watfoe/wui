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
	class="material-symbols-rounded WuiIcon {_class}"
	style:font-variation-settings="'fill' {fill ? 1 : 0}, 'wght' {weight}, 'grad' {grade}, 'opsz' 48;"
	style="--WuiIcon-size:{SIZES[size]};{style}"
	{...rest}
>
	{@render children()}
</span>

<style>
	.WuiIcon {
		--WuiIcon-size-sm: 1.125rem;
		--WuiIcon-size-md: 1.25rem;
		--WuiIcon-size-lg: 1.5rem;
		font-family: 'Material Symbols Rounded';
		font-weight: normal;
		font-style: normal;
		font-size: var(--WuiIcon-size, 1.25rem);
		font-feature-settings: 'liga';
		display: inline-block;
		direction: ltr;
		line-height: 1;
		letter-spacing: normal;
		max-width: var(--WuiIcon-size, 1.25rem);
		text-transform: none;
		white-space: nowrap;
		word-wrap: normal;
		text-rendering: optimizeLegibility;
		overflow-x: hidden;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>

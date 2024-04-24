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
		...rest
	}: IconAttributes = $props();
</script>

<!-- Apply width to icon to avoid shifting -->
<span
	role="img"
	class="material-symbols-rounded WuiIcon WuiText--{color} {_class}"
	style:font-variation-settings="'fill' {fill ? 1 : 0}, 'wght' {weight}, 'grad' {grade}, 'opsz' 48;"
	style:max-width="var(--WuiIcon-size-{size})"
	style:font-size="var(--WuiIcon-size-{size})"
	{...rest}
>
	{@render children()}
</span>

<style>
	.WuiIcon {
		--WuiIcon-size-sm: 1.125rem;
		--WuiIcon-size-md: 1.25rem;
		--WuiIcon-size-lg: 1.5rem;
	}
</style>

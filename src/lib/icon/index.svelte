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
	import './style.css';

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
	aria-label="icon"
	class="material-symbols-rounded w-icon {_class}"
	style="font-variation-settings: 'fill' {fill
		? 1
		: 0}, 'wght' {weight}, 'grad' {grade}, 'opsz' 48;--w-icon-size:{SIZES[size]};{style}"
	{...rest}
>
	{@render children()}
</span>

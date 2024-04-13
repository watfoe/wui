<script context="module" lang="ts">
	import type { WuiColor, WuiSize, WuiTextWeight } from '$lib/types';
	import type { Snippet } from 'svelte';

	export interface IconAttributes {
		class?: string;
		children?: Snippet;
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
		fill = false,
		grade = 0,
		size = 'md',
		weight = '400',
		...rest
	}: IconAttributes = $props();
</script>

<span
	role="img"
	class="material-symbols-rounded WuiIcon WuiIcon--{size} WuiText--{color} {rest.class || ''}"
	style="{rest.style || ''}; font-variation-settings: 'FILL' {fill
		? '1'
		: '0'}, 'wght' {weight}, 'GRAD' {grade}, 'opsz' 48;"
>
	<slot />
</span>

<style>
	.WuiIcon {
		font-size: var(--WuiIcon-size);
	}

	.WuiIcon--inherit {
		--WuiIcon-color: inherit;
	}

	.WuiIcon--sm {
		--WuiIcon-size: 1.125rem;
		line-height: 1.125rem;
	}
	.WuiIcon--md {
		--WuiIcon-size: 1.25rem;
		line-height: 1.75rem;
	}
	.WuiIcon--lg {
		--WuiIcon-size: 1.5rem;
		line-height: 1.5rem;
	}
</style>

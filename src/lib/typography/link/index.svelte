<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface LinkAttributes extends HTMLAnchorAttributes {
		bold?: boolean;
		color?: 'inherit' | 'link';
		italic?: boolean;
		underline?: boolean;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'heading' | 'title' | 'body' | 'label' | 'code';
	}
</script>

<script lang="ts">
	import '../text/style.css';
	let {
		bold = false,
		children,
		color = 'link',
		class: _class = '',
		italic = false,
		size = 'md',
		underline = false,
		variant = 'body',
		...rest
	}: LinkAttributes = $props();
</script>

<a
	{...rest}
	class="WuiAnchor WuiText WuiText--{variant} WuiText--{size} WuiText--{color}{bold ||
	variant === 'heading' ||
	variant === 'title'
		? ' WuiText--bold'
		: ''} {italic ? ' WuiText--italic' : ''}{underline ? ' WuiText--underline' : ''} {_class}"
>
	{#if children}
		{@render children()}
	{/if}
</a>

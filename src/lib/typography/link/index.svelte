<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface LinkAttributes extends HTMLAnchorAttributes {
		bold?: boolean;
		color?: 'inherit' | 'link';
		italic?: boolean;
		underline?: boolean;
		rtl?: boolean;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'heading' | 'title' | 'body' | 'label' | 'code';
	}
</script>

<script lang="ts">
	import '../text/style.css';
	let {
		bold = false,
		color = 'link',
		italic = false,
		rtl = false,
		size = 'md',
		underline = false,
		variant = 'body',
		...rest
	}: LinkAttributes = $props();
</script>

<a
	{...rest}
	class="WuiAnchor WuiText WuiText--{variant} WuiText--{size} WuiAnchor--{color} {variant ===
		'heading' ||
	variant === 'title' ||
	bold
		? 'WuiText--bold'
		: ''} {italic ? 'WuiText--italic' : ''} {rtl ? 'WuiText--rtl' : ''} {underline
		? 'WuiText--underline'
		: ''} {rest.class || ''}"
>
	<slot />
</a>

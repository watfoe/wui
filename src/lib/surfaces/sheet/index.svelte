<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface SheetAttributes extends HTMLAttributes<HTMLDivElement> {
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		gap?: 'sm' | 'nm' | 'md' | 'lg';
		height?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
		justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
		variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
		width?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
	}
</script>

<script lang="ts">
	import './style.css';

	let {
		gap = 'nm',
		variant = 'plain',
		color = 'neutral',
		justify = 'center',
		prefix,
		width,
		height,
		...rest
	}: SheetAttributes = $props();
</script>

<div
	{...rest}
	class="WuiSheet WuiSheet--{variant} WuiSheet--{color} WuiSheet--gap-{gap} {width
		? 'WuiSheet--width-' + width
		: ''} {height ? 'WuiSheet--height-' + height : ''} {rest.class || ''}"
	style="{rest.style || ''};--WuiSheetFlex-justify:{justify}"
>
	<slot />
</div>

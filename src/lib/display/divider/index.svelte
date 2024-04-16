<script context="module" lang="ts">
	import type { WuiSpacing } from '$lib';

	export interface DividerAttributes {
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		size?: 'sm' | 'md' | 'lg' | number;
		spacing?: WuiSpacing | number;
		vertical?: boolean;
	}
</script>

<script lang="ts">
	let {
		color = 'neutral',
		size = 'sm',
		spacing = 'ss',
		vertical = false
	}: DividerAttributes = $props();

	let sizeIsNumber = typeof size === 'number';
	let spacingIsNumber = typeof spacing === 'number';
</script>

<div
	role="separator"
	class="WuiDivider WuiColor-{color} WuiVariant-solid
	{sizeIsNumber ? '' : `WuiDivider--${size}`}
	{vertical ? 'WuiDivider--vert' : 'WuiDivider--horiz'}
	{spacingIsNumber ? '' : `WuiDivider--mgn-${spacing}`}"
	style="
		{spacingIsNumber ? `--WuiDivider--margin: ${spacing}px;` : ''}
		{sizeIsNumber ? `--WuiDivider--size: ${size}px;` : ''}
	"
/>

<style>
	.WuiDivider {
		--WuiDivider--color: var(--color-outline);
		--WuiDivider--size: 1px;
		--WuiDivider--margin: var(--space-xs);
	}

	.WuiDivider--horiz {
		width: 100%;
		height: var(--WuiDivider--size);
		margin: var(--WuiDivider--margin) 0;
	}

	.WuiDivider--vert {
		width: var(--WuiDivider--size);
		height: 100%;
		margin: 0 var(--WuiDivider--margin);
	}

	.WuiDivider--sm {
		--WuiDivider--size: 1px;
	}
	.WuiDivider--md {
		--WuiDivider--size: 2px;
	}
	.WuiDivider--lg {
		--WuiDivider--size: 3px;
	}

	.WuiDivider--mgn-ss {
		--WuiDivider--margin: var(--space-ss);
	}
	.WuiDivider--mgn-xs {
		--WuiDivider--margin: var(--space-xs);
	}
	.WuiDivider--mgn-sm {
		--WuiDivider--margin: var(--space-sm);
	}
	.WuiDivider--mgn-md {
		--WuiDivider--margin: var(--space-md);
	}
	.WuiDivider--mgn-lg {
		--WuiDivider--margin: var(--space-lg);
	}
	.WuiDivider--mgn-xl {
		--WuiDivider--margin: var(--space-xl);
	}
	.WuiDivider--mgn-xx {
		--WuiDivider--margin: var(--space-xx);
	}
</style>

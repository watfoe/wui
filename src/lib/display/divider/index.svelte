<script context="module" lang="ts">
	import type { WuiSpacing } from '$lib';

	export interface DividerAttributes {
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		spacing?: WuiSpacing | number;
		vertical?: boolean;
	}
</script>

<script lang="ts">
	let {
		color = 'neutral',
		size = 'sm',
		spacing = 'xs',
		vertical = false
	}: DividerAttributes = $props();
	let spacingIsNumber = typeof spacing === 'number';
</script>

<div
	role="separator"
	class="
	WuiDivider WuiDivider--{size} WuiDivider--{color}
	WuiColor-{color}
	{vertical ? 'WuiDivider--vert' : 'WuiDivider--horiz'}
	{spacingIsNumber ? '' : 'WuiDivider--mgn-{spacing}'}"
	style={spacingIsNumber ? '--WuiDivider--margin: {spacing}px' : ''}
/>

<style>
	.WuiDivider {
		--WuiDivider--color: var(--color-outline);
		--WuiDivider--size: 1px;
		--WuiDivider--margin: var(--space-xs);
		background-color: var(--WuiDivider--color);
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

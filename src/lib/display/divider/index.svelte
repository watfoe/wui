<script context="module" lang="ts">
	export interface DividerAttributes {
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		vertical?: boolean;
	}
</script>

<script lang="ts">
	let { color = 'neutral', size = 'sm', vertical = false }: DividerAttributes = $props();
</script>

<div
	role="separator"
	class="WuiDivider WuiDivider--{size} WuiDivider--{color} {vertical
		? 'WuiDivider--vert'
		: 'WuiDivider--horiz'}"
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
		--WuiDivider--margin: var(--space-xs);
	}
	.WuiDivider--md {
		--WuiDivider--size: 2px;
		--WuiDivider--margin: var(--space-sm);
	}
	.WuiDivider--lg {
		--WuiDivider--size: 3px;
		--WuiDivider--margin: var(--space-nm);
	}

	.WuiDivider--primary {
		--WuiDivider--color: var(--color-primary);
	}
	.WuiDivider--neutral {
		--WuiDivider--color: var(--color-outline);
	}
	.WuiDivider--success {
		--WuiDivider--color: var(--color-success);
	}
	.WuiDivider--warning {
		--WuiDivider--color: var(--color-warning);
	}
	.WuiDivider--danger {
		--WuiDivider--color: var(--color-danger);
	}
</style>

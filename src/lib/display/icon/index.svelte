<script context="module" lang="ts">
	import type { Snippet } from 'svelte';

	export interface IconAttributes {
		class?: string;
		children?: Snippet;
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit';
		fill?: boolean;
		grade?: number;
		size?: 'sm' | 'md' | 'lg';
		style?: string;
		weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
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
	aria-label="Icon"
	role="img"
	class="material-symbols-rounded WuiIcon WuiIcon--{size} WuiIcon--{color} {rest.class || ''}"
	style="{rest.style || ''}; font-variation-settings: 'FILL' {fill
		? '1'
		: '0'}, 'wght' {weight}, 'GRAD' {grade}, 'opsz' 48;"
>
	<slot />
</span>

<style>
	.WuiIcon {
		color: var(--WuiIcon-color);
		font-size: var(--WuiIcon-size);
	}

	.WuiIcon--primary {
		--WuiIcon-color: var(--color-primary);
	}
	.WuiIcon--neutral {
		--WuiIcon-color: var(--color-neutral);
	}
	.WuiIcon--success {
		--WuiIcon-color: var(--color-success);
	}
	.WuiIcon--warning {
		--WuiIcon-color: var(--color-warning);
	}
	.WuiIcon--danger {
		--WuiIcon-color: var(--color-danger);
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

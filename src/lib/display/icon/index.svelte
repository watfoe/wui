<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { HTMLAttributes } from 'svelte/elements';

	interface IconAttributes extends HTMLAttributes<HTMLSpanElement> {
		children: Snippet;
		class?: string;
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'inherit';
		fill?: '0' | '1';
		size?: 'sm' | 'md' | 'lg';
	}

	let { size = 'md', fill = '0', color = 'inherit', ...rest } = $props<IconAttributes>();
</script>

<span
	role="img"
	aria-label="Icon"
	{...rest}
	class="material-symbols-rounded WuiIcon WuiIcon--{size} WuiIcon--{color} {rest.class || ''}"
>
	<slot />
</span>

<style>
	.WuiIcon {
		color: var(--WuiIcon-color);
		font-size: var(--WuiIcon-size);
		font-variation-settings: 'FILL' var(--fill);
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

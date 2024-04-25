<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface AvatarGroupAttributes extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
		color?: WuiColor;
		size?: WuiSize;
		variant?: WuiVariant;
		shape?: Omit<WuiShape, 'pill'>;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Row } from '$lib/layout';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, color, size, variant, shape }: AvatarGroupAttributes = $props();
	setContext('wui-avatar-group-ctx', { color, size, variant, shape });
</script>

<Row role="group" aria-label="Avatar Group" class="WuiAvatarGroup">
	{@render children()}
</Row>

<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface AvatarGroupProps {
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
	import { setContext } from 'svelte';

	const { color, size, variant, shape }: AvatarGroupProps = $props();
	setContext('wui-avatar-group-ctx', { color, size, variant, shape });
</script>

<Row role="group" aria-label="Avatar Group" class="WuiAvatarGroup">
	<slot />
</Row>

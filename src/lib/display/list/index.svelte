<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import type { LikeButtonAttributes } from '$lib/utils';

	export interface ListAttributes extends HTMLUListElement {
		color?: WuiColor;
		orientation: 'horizontal' | 'vertical';
		size?: WuiSize;
		shape?: Omit<WuiShape, 'pill' | 'circle'>;
		spacing?: LikeButtonAttributes<HTMLUListElement>['gap'] | 'none';
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { setContext } from 'svelte';

	let {
		color,
		orientation = 'horizontal',
		size,
		shape = 'rounded',
		spacing,
		variant = 'plain'
	}: ListAttributes = $props();

	$effect.pre(() => {
		if (shape === 'circle' || shape === 'pill') {
			shape = 'rounded';
		}
	});

	setContext('wui-tab-ctx', {
		color,
		size,
		variant,
		orientation
	});
</script>

<ul
	class="WuiList WuiList--{orientation} WuiList--spacing-{spacing} WuiSurface WuiSurface--{shape}"
>
	<slot />
</ul>

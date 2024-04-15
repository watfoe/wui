<script lang="ts" context="module">
	import type { WuiColor, WuiListMarker, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import type { LikeButtonAttributes } from '$lib/utils';

	export interface ListAttributes extends HTMLUListElement {
		color?: WuiColor;
		marker?: WuiListMarker;
		orientation: 'horizontal' | 'vertical';
		shape?: Omit<WuiShape, 'circle'>;
		size?: WuiSize;
		gap?: LikeButtonAttributes<HTMLUListElement>['gap'] | 'none';
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { setContext } from 'svelte';

	let {
		color,
		marker,
		orientation = 'vertical',
		shape,
		size,
		gap,
		variant
	}: ListAttributes = $props();

	$effect.pre(() => {
		if (shape === 'circle') {
			shape = 'rounded';
		} else if (shape === 'pill' && orientation !== 'horizontal') {
			shape = 'rounded';
		}
	});

	setContext('wui-tab-ctx', {
		color,
		marker,
		shape,
		size,
		variant,
		orientation
	});
</script>

<ul class="WuiList WuiList--{orientation} WuiList--gap-{gap}">
	<slot />
</ul>

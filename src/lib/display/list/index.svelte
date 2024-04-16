<script lang="ts" context="module">
	import { Flex } from '$lib/layout';
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

<Flex
	align="flex-start"
	justify="flex-start"
	direction={orientation === 'horizontal' ? 'row' : 'column'}
	class="WuiGap-{gap}"
>
	<slot />
</Flex>

<script lang="ts">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import { Button, type ButtonAttributes } from '$lib/buttons';
	import { getContext, untrack } from 'svelte';
	import type { LikeButtonAttributes } from '$lib/utils';
	import { navigation } from '$lib';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { color, size, shape, variant, onkeydown, ...rest }: ButtonAttributes = $props();
	let active = $state(false);
	let ctx: {
		color?: WuiColor;
		navigation: LikeButtonAttributes<HTMLButtonAttributes>['navigation'];
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	} = getContext('wui-tab-ctx') || {};

	$effect.pre(() => {
		untrack(() => {
			if (shape === 'circle' || shape === 'pill') {
				shape = 'rounded';
			}
		});
	});

	function select() {
		active = !active;
	}
</script>

<Button
	aria-selected={active}
	class="WuiTab"
	color={active ? color || ctx.color || 'primary' : 'neutral'}
	navigation={ctx.navigation || 'horizontal'}
	role="tab"
	size={size || ctx.size || 'sm'}
	shape={shape || ctx.shape || 'rounded'}
	tabindex={active ? 0 : -1}
	variant={active ? variant || ctx.variant || 'soft' : 'plain'}
	onselect={select}
	{...rest}
/>

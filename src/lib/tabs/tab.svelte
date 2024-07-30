<script lang="ts">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import { Button, type ButtonAttributes } from '../button';
	import { getContext } from 'svelte';

	let {
		color,
		size,
		shape,
		textsize = 'md',
		variant,
		onkeydown,
		...rest
	}: ButtonAttributes = $props();

	let active = $state(false);
	let ctx: {
		color?: WuiColor;
		navigation: ButtonAttributes['navigation'];
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	} = getContext('wui-tab-ctx') || {};

	if (shape === 'circle' || shape === 'pill') {
		shape = 'rounded';
	}

	function select() {
		active = !active;
	}
</script>

<Button
	aria-selected={active}
	class="w-tab"
	color={active ? color || ctx.color || 'primary' : 'neutral'}
	navigation={ctx.navigation || 'horizontal'}
	role="tab"
	size={size || ctx.size || 'sm'}
	shape={shape || ctx.shape || 'rounded'}
	tabindex={active ? 0 : -1}
	variant={active ? variant || ctx.variant || 'soft' : 'plain'}
	onselect={select}
	{textsize}
	{...rest}
/>

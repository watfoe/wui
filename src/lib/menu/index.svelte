<script lang="ts" module>
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface MenuAttributes extends Omit<PopupAttributes<'menu'>, 'role' | 'aria-label'> {
		itemsize?: WuiSize;
		itemcolor?: WuiColor;
		itemshape?: WuiShape;
		itemvariant?: WuiVariant;
	}
</script>

<script lang="ts">
	import { Popup, type PopupAttributes } from '../popup';
	import { setContext } from 'svelte';

	let {
		color,
		direction = 'column',
		gap = 2,
		itemcolor,
		itemsize,
		itemshape,
		itemvariant,
		shape,
		...rest
	}: MenuAttributes = $props();

	// To be use by MenuItem
	setContext('wui-menu-ctx', {
		color: itemcolor || color,
		direction,
		size: itemsize,
		shape: itemshape || shape,
		variant: itemvariant
	});

	if (shape === 'circle') {
		shape = 'rounded';
	}
</script>

<Popup element="menu" {color} {direction} {gap} {shape} {...rest} />

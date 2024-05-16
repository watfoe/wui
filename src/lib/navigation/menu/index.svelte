<script context="module" lang="ts">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface MenuAttributes extends Omit<PopupAttributes, 'role' | 'aria-label'> {
		itemsize?: WuiSize;
		itemcolor?: WuiColor;
		itemshape?: WuiShape;
		itemvariant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import Popup, { type PopupAttributes } from '$lib/utils/popup/index.svelte';
	import { setContext } from 'svelte';

	let {
		class: _class = '',
		color,
		direction = 'column',
		gap = 'ss',
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

<Popup
	aria-label="Menu"
	class="WuiMenu {_class}"
	role="menu"
	{color}
	{direction}
	{gap}
	{shape}
	{...rest}
/>

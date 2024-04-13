<script context="module" lang="ts">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib';

	export interface MenuAttributes extends Omit<PopupAttributes, 'role' | 'aria-label'> {
		color?: WuiColor;
		shape?: Omit<WuiShape, 'circle'>;
		variant?: WuiVariant;
		itemsize?: WuiSize;
		itemcolor?: WuiColor;
		itemshape?: Omit<WuiShape, 'circle'>;
		itemvariant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Popup, type PopupAttributes } from '$lib/utils';
	import { setContext } from 'svelte';

	let {
		_this = $bindable(),
		class: _class = '',
		color,
		shape,
		variant,
		itemcolor,
		itemsize,
		itemshape,
		itemvariant,
		...rest
	}: MenuAttributes = $props();

	// To be use by MenuItem
	setContext('wui-tab-ctx', {
		color: itemcolor || color,
		size: itemsize,
		shape: itemshape,
		variant: itemvariant
	});
</script>

<Popup
	{...rest}
	role="menu"
	aria-label="Menu"
	class="WuiMenu {_class}"
	{variant}
	{color}
	{shape}
	bind:_this
>
	<slot />
</Popup>

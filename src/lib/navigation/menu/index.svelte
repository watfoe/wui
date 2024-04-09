<script context="module" lang="ts">
	export interface MenuAttributes extends Omit<PopupAttributes, 'role' | 'aria-label'> {
		color?: ButtonAttributes['color'];
		size?: ButtonAttributes['size'];
		variant?: ButtonAttributes['variant'];
	}
</script>

<script lang="ts">
	import './style.css';
	import { Popup, type PopupAttributes } from '$lib/utils';
	import type { ButtonAttributes } from '$lib';
	import { setContext } from 'svelte';

	let { _this = $bindable(), class: _class = '', color, size, ...rest }: MenuAttributes = $props();
	// To be use by MenuItem
	setContext('wui-tab', {
		color,
		size
	});
</script>

<Popup {...rest} role="menu" aria-label="Menu" class="WuiMenu {_class}" bind:_this>
	<slot />
</Popup>

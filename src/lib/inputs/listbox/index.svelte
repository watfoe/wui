<script context="module" lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface ListboxAttributes extends HTMLFieldsetAttributes {
		_this?: HTMLFieldSetElement;
		color?: WuiColor;
		multiple?: boolean;
		size?: WuiSize;
		shape?: WuiShape;
		value?: string;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { setContext } from 'svelte';

	let {
		_this = $bindable(),
		color,
		multiple = false,
		name,
		onchange,
		size,
		shape,
		value = $bindable(),
		variant,
		...rest
	}: ListboxAttributes = $props();
	let selections = [] as HTMLInputElement[];

	$effect.pre(() => {
		if (!name) {
			name = Math.random().toString(36).substring(2, 15);
		}

		setContext('wui-listbox-ctx', {
			color,
			multiple,
			name,
			size,
			shape,
			variant
		});
	});

	function change(e: Event & { currentTarget: HTMLFieldSetElement }) {
		let input = e.target as HTMLInputElement;
		if (selections.length === 1) {
			selections[0].checked = false;
		}
		selections[0] = input;
		value = input.value;

		onchange?.(e);
	}
</script>

<fieldset
	role={rest.role || 'listbox'}
	aria-label={rest['aria-label'] || 'Select an option'}
	{name}
	class="WuiListbox {rest.class || ''}"
	style={rest.style || ''}
	bind:this={_this}
	onchange={change}
>
	<slot />
</fieldset>

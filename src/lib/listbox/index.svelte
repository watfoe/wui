<script context="module" lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface ListboxAttributes extends HTMLFieldsetAttributes {
		listbox?: HTMLFieldSetElement;
		color?: WuiColor;
		multiple?: boolean;
		size?: WuiSize;
		shape?: WuiShape;
		value?: string;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	let {
		listbox = $bindable(),
		children,
		color,
		multiple = false,
		onchange,
		size,
		shape,
		value = $bindable(),
		variant,
		...rest
	}: ListboxAttributes = $props();
	let selections = [] as HTMLInputElement[];

	setContext('wui-listbox-ctx', {
		color,
		multiple,
		size,
		shape,
		variant
	});

	function change(e: Event & { currentTarget: HTMLFieldSetElement }) {
		let input = e.target as HTMLInputElement;
		if (input.checked) {
			if (selections.length === 1) {
				// Uncheck the previously selected item
				selections[0].checked = false;
				// Dispatch the change event to the previously selected item so that svelte bind:checked can update
				// But do not bubble the event to the parent fieldset
				selections[0].dispatchEvent(new Event('change', { bubbles: false }));
			}
			selections[0] = input;
			value = input.value;

			onchange?.(e);
		} else {
			e.stopImmediatePropagation();
		}
	}
</script>

<fieldset
	role={rest.role || 'listbox'}
	aria-label={rest['aria-label'] || 'Select an option'}
	class="w-listbox {rest.class || ''}"
	style={rest.style || ''}
	bind:this={listbox}
	onchange={change}
>
	{#if children}
		{@render children()}
	{/if}
</fieldset>

<style>
	.w-listbox {
		background-color: inherit;
		border: 0;
		border-radius: inherit;
		display: flex;
		flex-direction: column;
		gap: 3px;
		width: 100%;
	}
</style>

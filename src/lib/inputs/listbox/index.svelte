<script context="module" lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import type { LikeButtonAttributes } from '$lib/utils';

	// TODO: Implement color, size, and variant.
	export interface ListboxAttributes extends HTMLFieldsetAttributes {
		_this?: HTMLFieldSetElement;
		color?: LikeButtonAttributes<HTMLFieldSetElement>['color'];
		multiple?: boolean;
		size?: LikeButtonAttributes<HTMLFieldSetElement>['size'];
		value?: string;
		variant?: LikeButtonAttributes<HTMLFieldSetElement>['variant'];
	}
</script>

<script lang="ts">
	import './style.css';
	import { setContext } from 'svelte';

	let {
		_this = $bindable(),
		multiple = false,
		name,
		onchange,
		value = $bindable(),
		...rest
	}: ListboxAttributes = $props();
	let selections = [] as HTMLInputElement[];

	$effect.pre(() => {
		if (!name) {
			name = Math.random().toString(36).substring(2, 15);
		}

		setContext('listbox-name', {
			name,
			multiple
		});
	});

	function change(e: Event & { currentTarget: HTMLFieldSetElement }) {
		if (selections.length === 1) {
			selections[0].checked = false;
		}
		selections[0] = e.target as HTMLInputElement;
		value = selections[0].value;

		onchange?.(e);
	}

	// $effect(() => {
	// 	untrack(() => {
	// 		const children = _this?.querySelectorAll('li') || [];

	// 		// Filter out any elements that are not 'item' elements or a divider.
	// 		for (let i = 0; i < children.length; i++) {
	// 			const child = children[i] as HTMLLIElement;
	// 			const role = child?.getAttribute('role');

	// 			if (role !== 'option' && role !== 'listitem' && role !== 'menuitem') {
	// 				continue;
	// 			}

	// 			// Check if the item has aria-selected to determine if it is selected.
	// 			const selected = child?.getAttribute('aria-selected') === 'true';
	// 			const value = child?.getAttribute('value');
	// 			if (selected) {
	// 				selections.push(i);
	// 				if (value) {
	// 					values.push(value);
	// 					onchange?.(new CustomEvent('change', { detail: { values, elements: [children[i]] } }));
	// 				}
	// 			}

	// 			child.addEventListener('click', () => {
	// 				if (multiple) {
	// 					if (selections.includes(i)) {
	// 						selections = selections.filter((v) => v !== i);
	// 						dispatch(child, false);
	// 						if (value) {
	// 							values = values.filter((v) => v !== value);
	// 						}
	// 					} else {
	// 						selections.push(i);
	// 						dispatch(child, true);
	// 						if (value) {
	// 							values.push(value);
	// 						}
	// 					}
	// 				} else {
	// 					if (selections.length === 1) {
	// 						dispatch(children[selections[0]] as HTMLLIElement, false);
	// 					}
	// 					selections = [i];
	// 					dispatch(child, true);
	// 					if (value) {
	// 						values = [value];
	// 					}
	// 				}

	// 				onchange?.(
	// 					new CustomEvent('change', {
	// 						detail: { values, elements: selections.map((index) => children[index]) }
	// 					})
	// 				);
	// 			});
	// 		}
	// 	});
	// });
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

<script context="module" lang="ts">
	import type { ColAttributes } from '$lib/layout/col/index.svelte';
	import { onMount, type Snippet } from 'svelte';

	export interface ListboxAttributes extends Omit<ColAttributes, 'onchange'> {
		backdrop?: boolean;
		class?: string;
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		children: Snippet;
		multiple?: boolean;
		onchange?: (e: CustomEvent) => void;
		style?: string;
		selected?: boolean;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
	}
</script>

<script lang="ts">
	import './style.css';
	import { Col } from '$lib/layout';

	let { _this, children, multiple = false, onchange, ...rest } = $props<ListboxAttributes>();

	let selections = [] as number[];
	let values = [] as string[];

	onMount(() => {
		const children = _this?.querySelectorAll('button') || [];

		// Filter out any elements that are not 'item' elements or a divider.
		for (let i = 0; i < children.length; i++) {
			const child = children[i] as HTMLButtonElement;
			const role = child?.getAttribute('role');

			if (role !== 'option' && role !== 'listitem' && role !== 'menuitem') {
				continue;
			}

			// Check if the item has aria-selected to determine if it is selected.
			const selected = child?.getAttribute('aria-selected') === 'true';
			const value = child?.getAttribute('value');
			if (selected) {
				selections.push(i);
				if (value) {
					values.push(value);
					onchange?.(new CustomEvent('change', { detail: { values, elements: [children[i]] } }));
				}
			}

			child.addEventListener('click', () => {
				if (multiple) {
					if (selections.includes(i)) {
						selections = selections.filter((v) => v !== i);
						dispatch(child, false);
						if (value) {
							values = values.filter((v) => v !== value);
						}
					} else {
						selections.push(i);
						dispatch(child, true);
						if (value) {
							values.push(value);
						}
					}
				} else {
					if (selections.length === 1) {
						dispatch(children[selections[0]] as HTMLButtonElement, false);
					}
					selections = [i];
					dispatch(child, true);
					if (value) {
						values = [value];
					}
				}

				onchange?.(new CustomEvent('change', { detail: { values, elements: selections.map((index) => children[index]) } }));
			});
		}
	});

	function dispatch(element: HTMLButtonElement, selected: boolean) {
		element.dispatchEvent(
			new CustomEvent('select', {
				detail: { selected }
			})
		);
	}
</script>

<Col
	role={rest.role || 'listbox'}
	aria-label={rest['aria-label'] || 'Select an option'}
	class="WuiListbox {rest.class || ''}"
	style={rest.style || ''}
	bind:_this
>
	{@render children()}
</Col>

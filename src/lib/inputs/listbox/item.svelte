<script lang="ts" context="module">
	import type { ButtonAttributes } from '$lib/button';

	export interface ListItemAttributes extends Omit<ButtonAttributes, 'onselect'> {
		selected?: boolean;
		role?: 'listitem' | 'option' | 'menuitem';
		onselect?: (e: CustomEvent<{ selected: boolean }>) => void;
	}
</script>

<script lang="ts">
	import { Button } from '$lib/button';
	import { onMount } from 'svelte';

	let { _this, value, selected = false, role = 'listitem', ...rest } = $props<ListItemAttributes>();

	onMount(() => {
		if (selected && value) {
			// Without the timeout, the event is dispatched but the listener has not been registered yet.
			setTimeout(() => {
				_this?.click();
			}, 0);
		}

		// Keyboard accessibility
		_this?.addEventListener('keydown', (e: KeyboardEvent) => {
			const { key } = e;

			if (key === 'ArrowDown') {
				e.preventDefault();

				// If it has focus, move to the next item
				if (_this === document.activeElement) {
					const next = _this.nextElementSibling as HTMLButtonElement;

					if (next) {
						next.focus();
					} else if (_this.previousElementSibling) {
						const first = _this.parentElement?.firstElementChild as HTMLButtonElement;
						first?.focus();
					}
				}
			} else if (key === 'ArrowUp') {
				e.preventDefault();
				// If it has focus, move to the next item
				if (_this === document.activeElement) {
					const previous = _this.previousElementSibling as HTMLButtonElement;

					if (previous) {
						previous.focus();
					} else if (_this.nextElementSibling) {
						const last = _this?.parentElement?.lastElementChild as HTMLButtonElement;
						last?.focus();
					}
				}
			} else if (key === 'Enter' || key === ' ') {
				e.preventDefault();
				_this?.click();
			}
		});
	});

	function _onselect(e: CustomEvent<{ selected: boolean }>) {
		selected = e.detail.selected;
	}
</script>

<Button
	{...rest}
	{role}
	{value}
	type="button"
	aria-selected={selected}
	variant={selected ? 'soft' : 'plain'}
	color={selected ? 'primary' : 'neutral'}
	justify="flex-start"
	width="full"
	bold={false}
	class="WuiListbox__listitem"
	onselect={_onselect}
	bind:_this
>
	<slot />
</Button>

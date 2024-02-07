<script lang="ts" context="module">
	import type { ButtonAttributes } from '$lib/button';

	export interface ListItemAttributes extends ButtonAttributes {
		value?: string;
		selected?: boolean;
		element?: HTMLButtonElement;
		role?: 'listitem' | 'option' | 'menuitem';
	}
</script>

<script lang="ts">
	import { Button } from '$lib/button';

	let {
		value,
		selected = false,
		element,
		role = 'listitem',
		...rest
	} = $props<ListItemAttributes>();

	$effect(() => {
		if (selected && value) {
			// Without the timeout, the event is dispatched but the listener has not been registered yet.
			setTimeout(() => {
				element?.click();
			}, 0);
		}

		// Keyboard accessibility
		element?.addEventListener('keydown', (e: KeyboardEvent) => {
			const { key } = e;

			if (key === 'ArrowDown') {
				e.preventDefault();

				// If it has focus, move to the next item
				if (element === document.activeElement) {
					const next = element.nextElementSibling as HTMLButtonElement;

					if (next) {
						next.focus();
					} else if (element.previousElementSibling) {
						const first = element.parentElement?.firstElementChild as HTMLButtonElement;
						first?.focus();
					}
				}
			} else if (key === 'ArrowUp') {
				e.preventDefault();
				// If it has focus, move to the next item
				if (element === document.activeElement) {
					const previous = element.previousElementSibling as HTMLButtonElement;

					if (previous) {
						previous.focus();
					} else if (element.nextElementSibling) {
						const last = element.parentElement?.lastElementChild as HTMLButtonElement;
						last?.focus();
					}
				}
			} else if (key === 'Enter' || key === ' ') {
				e.preventDefault();
				element?.click();
			}
		});
	});

	function select(e: CustomEvent<{ selected: boolean }>) {
		selected = e.detail.selected;
	}
</script>

<Button
	{...rest}
	{value}
	bind:element
	{role}
	type="button"
	aria-selected={selected}
	variant={selected ? 'soft' : 'plain'}
	color={selected ? 'primary' : 'neutral'}
	justify="flex-start"
	width="full"
	bold={false}
	class="WuiListbox__listitem"
	onselect={select}
>
	<slot />
</Button>

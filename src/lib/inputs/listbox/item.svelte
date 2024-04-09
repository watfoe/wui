<script lang="ts" context="module">
	import { ButtonLike, type ButtonLikeAttributes } from '$lib/utils';
	import { getContext, untrack } from 'svelte';

	export interface ListItemAttributes
		extends Omit<ButtonLikeAttributes<HTMLLabelElement>, 'element'> {
		_this?: HTMLInputElement;
		selected?: boolean;
		role?: 'listitem' | 'option';
		value?: string;
	}
</script>

<script lang="ts">
	let {
		_this = $bindable(),
		role = 'listitem',
		selected = $bindable(false),
		value = $bindable(),
		...rest
	}: ListItemAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
	const context: { name: string; multiple: boolean } = getContext('listbox-name') || {};

	$effect(() => {
		untrack(() => {
			if (selected && value) {
				// Without the timeout, the event is dispatched but the listener has not been registered yet.
				setTimeout(() => {
					_this?.click();
				}, 0);
			}
		});
	});

	function keydown(e: KeyboardEvent) {
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
	}
</script>

<fieldset
	{role}
	aria-selected={selected}
	class="WuiListbox__item WuiListbox__item_{context.name}"
	onkeydown={keydown}
>
	<input
		type="checkbox"
		class="WuiListbox__item__input"
		{id}
		{value}
		name={context.name}
		bind:this={_this}
		bind:checked={selected}
	/>

	<ButtonLike
		{...rest}
		element="label"
		variant={selected ? 'soft' : 'plain'}
		color={selected ? 'primary' : 'neutral'}
		tabindex={selected ? 0 : -1}
		size="md"
		justify="flex-start"
		width="full"
		bold={false}
		for={id}
		class="WuiListbox__item_label"
	>
		<slot />
	</ButtonLike>
</fieldset>

<script lang="ts" context="module">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import { getContext, untrack } from 'svelte';

	export interface ListboxItemAttributes extends LikeButtonAttributes<HTMLLabelAttributes> {
		listboxitem?: HTMLInputElement;
		role?: 'listitem' | 'option';
		selected?: boolean;
		value?: string;
	}
</script>

<script lang="ts">
	import LikeButton, { type LikeButtonAttributes } from '$lib/utils/likebutton/index.svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let {
		listboxitem = $bindable(),
		children,
		color,
		px = 'sm',
		role = 'listitem',
		selected = $bindable(false),
		shape,
		size,
		value = $bindable(),
		variant,
		...rest
	}: ListboxItemAttributes = $props();

	let _checked = $state(selected);

	const id = Math.random().toString(36).substring(2, 15);
	const ctx: {
		color: WuiColor;
		multiple: boolean;
		size: WuiSize;
		shape: WuiShape;
		variant: WuiVariant;
	} = getContext('wui-listbox-ctx') || {};

	$effect(() => {
		untrack(() => {
			if (_checked && value) {
				// Without the timeout, the event is dispatched but the listener has not yet been registered.
				setTimeout(() => {
					listboxitem?.dispatchEvent(new Event('change', { bubbles: true }));
				}, 0);
			}
		});
	});

	function keydown(e: KeyboardEvent) {
		if (listboxitem && (e.key === 'Enter' || e.key === ' ')) {
			if (ctx.multiple) {
				listboxitem.click();
			} else if (!_checked) {
				listboxitem.click();
			}
		}
	}
</script>

<LikeButton
	aria-selected={_checked}
	class="WuiListbox__item"
	color={_checked ? color || ctx.color || 'primary' : 'neutral'}
	element="label"
	for={id}
	justify="flex-start"
	navigation="vertical"
	size={size || ctx.size || 'md'}
	shape={shape || ctx.shape || 'rounded'}
	variant={_checked ? variant || ctx.variant || 'soft' : 'plain'}
	onkeydown={keydown}
	{px}
	{...rest}
>
	<input
		hidden
		type="checkbox"
		tabindex="-1"
		bind:checked={_checked}
		bind:this={listboxitem}
		{id}
		{value}
	/>
	{#if children}
		{@render children()}
	{/if}
</LikeButton>

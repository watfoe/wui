<script lang="ts" context="module">
	import type { WuiShape, WuiSize } from '$lib/types';
	import { getContext, untrack } from 'svelte';

	export interface ListboxItemAttributes
		extends Omit<LikeButtonAttributes<HTMLLiAttributes>, 'element'> {
		_this?: HTMLLIElement;
		selected?: boolean;
		value?: string;
	}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';
	import type { HTMLLiAttributes } from 'svelte/elements';

	let {
		_this = $bindable(),
		children,
		color,
		px = 'sm',
		selected = $bindable(false),
		shape,
		size,
		style = '',
		value = $bindable(),
		variant,
		// we don't want to pass this prop to the LikeButton
		onclick,
		onchange,
		...rest
	}: ListboxItemAttributes = $props();

	const ctx: {
		multiple: boolean;
		size: WuiSize;
		shape: WuiShape;
		select: (target: HTMLLIElement, c: () => void) => void;
	} = getContext('wui-select-ctx') || {};

	$effect(() => {
		untrack(() => {
			if (selected && value) {
				ctx.select(_this!, () => {
					selected = false;
				});
			}
		});
	});

	function keydown(e: KeyboardEvent) {
		if (_this && (e.key === 'Enter' || e.key === ' ' || e.key === 'Tab')) {
			select();
		}
	}

	function select() {
		selected = true;
		ctx.select(_this!, () => {
			selected = false;
		});
	}
</script>

<LikeButton
	aria-selected={selected}
	color={color || 'inherit'}
	element="li"
	justify="flex-start"
	navigation="vertical"
	role="option"
	size={size || ctx.size || 'md'}
	shape={shape || ctx.shape || 'rounded'}
	variant={variant || 'plain'}
	onkeydown={keydown}
	onclick={select}
	data-value={value}
	width="100%"
	bind:_this
	{px}
	{style}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</LikeButton>

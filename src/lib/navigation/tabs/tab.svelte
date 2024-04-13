<script lang="ts">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	import { Button, type ButtonAttributes } from '$lib/buttons';
	import { getContext, untrack } from 'svelte';

	let {
		_this = $bindable(),
		color,
		size,
		shape,
		variant,
		onkeydown,
		...rest
	}: ButtonAttributes = $props();
	let active = $state(false);
	let context: {
		color?: WuiColor;
		size?: WuiSize;
		shape?: WuiShape;
		variant?: WuiVariant;
	} = getContext('wui-tab-ctx') || {};

	$effect.pre(() => {
		untrack(() => {
			if (shape === 'circle' || shape === 'pill') {
				shape = 'rounded';
			}
		});
	});

	function select() {
		active = !active;
	}

	// Keyboard accessibility
	// function keydown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
	// 	const key = e.key;

	// 	if (key === 'ArrowRight' || key === 'ArrowDown') {
	// 		const next = e.currentTarget.nextElementSibling as HTMLElement;
	// 		if (next) {
	// 			next.focus();
	// 		}
	// 	} else if (key === 'ArrowLeft' || key === 'ArrowUp') {
	// 		const prev = e.currentTarget.previousElementSibling as HTMLElement;
	// 		if (prev) {
	// 			prev.focus();
	// 		}
	// 	} else if (key === 'Home') {
	// 		const first = e.currentTarget.parentElement?.firstElementChild as HTMLElement;
	// 		if (first) {
	// 			first.focus();
	// 		}
	// 	} else if (key === 'End') {
	// 		const last = e.currentTarget.parentElement?.lastElementChild as HTMLElement;
	// 		if (last) {
	// 			last.focus();
	// 		}
	// 	} else if (key === 'Enter' || key === ' ') {
	// 		_this?.click();
	// 	}

	// 	onkeydown?.(e);
	// }
</script>

<Button
	{...rest}
	role="tab"
	aria-selected={active}
	tabindex={active ? 0 : -1}
	navigation="horizontal"
	variant={active ? variant || context.variant || 'soft' : 'plain'}
	color={active ? color || context.color || 'primary' : 'neutral'}
	size={size || context.size || 'sm'}
	shape={shape || context.shape || 'rounded'}
	class="WuiTab"
	onselect={select}
	bold={false}
	bind:_this
>
	<slot />
</Button>

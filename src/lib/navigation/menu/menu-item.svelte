<script lang="ts" context="module">
	export interface MenuItemAttributes extends ButtonAttributes {
		selected?: boolean;
	}
</script>

<script lang="ts">
	import { Button, type ButtonAttributes } from '$lib/buttons';
	import { getContext } from 'svelte';

	let { color, role = 'listitem', selected = false, size, ...rest }: MenuItemAttributes = $props();
	let context: {
		color?: ButtonAttributes['color'];
		size?: ButtonAttributes['size'];
		variant?: ButtonAttributes['variant'];
	} = getContext('wui-tab') || {};

	const altColor =
		(color || context.color) === 'primary' ? 'neutral' : color || context.color || 'neutral';
</script>

<Button
	bold={false}
	{...rest}
	aria-selected={selected}
	role="menuitem"
	variant={selected ? 'soft' : 'plain'}
	color={color || (selected ? context.color || 'primary' : altColor)}
	size={size || context.size || 'md'}
	tabindex={selected ? 0 : -1}
	justify="flex-start"
	width="full"
	class="WuiMenu__item"
>
	<slot />
</Button>

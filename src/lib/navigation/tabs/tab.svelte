<script lang="ts">
	import { Button, type ButtonAttributes } from '$lib/buttons';
	import { getContext } from 'svelte';

	let { color, size, variant, ...rest }: ButtonAttributes = $props();
	let active = $state(false);
	let context: {
		color?: ButtonAttributes['color'];
		size?: ButtonAttributes['size'];
		variant?: ButtonAttributes['variant'];
	} = getContext('wui-tab') || {};

	function select() {
		active = !active;
	}
</script>

<Button
	{...rest}
	role="tab"
	aria-selected={active}
	tabindex={active ? 0 : -1}
	variant={active ? variant || context.variant || 'soft' : 'plain'}
	color={active ? color || context.color || 'primary' : 'neutral'}
	size={size || context.size || 'sm'}
	class="WuiTab"
	onselect={select}
	bold={false}
>
	<slot />
</Button>

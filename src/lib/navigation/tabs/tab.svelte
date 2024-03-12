<script lang="ts">
	import { Button, type ButtonAttributes } from '$lib/buttons';

	let { children } = $props<ButtonAttributes>();
	let active = $state(false);

	function select(e: CustomEvent) {
		active = e.detail.active;
	}
</script>

<Button
	role="tab"
	aria-selected={active}
	tabindex={active ? 0 : -1}
	variant={active ? 'soft' : 'plain'}
	color={active ? 'primary' : 'neutral'}
	size="sm"
	class="WuiTab"
	onselect={select}
	bold={false}
>
	{#if children}
		{@render children()}
	{/if}
</Button>

<script>
	import Flex from '../flex/index.svelte';

	/** @type {import('../flex').FlexAttributes} */
	const { class: _class = '', direction = 'column', ...rest } = $props();
</script>

<Flex
	align="flex-start"
	justify="flex-start"
	class="watfoe-content {_class}"
	{direction}
	width="100%"
	px="lg"
	pb="sm"
	mt={50}
	{...rest} />

<style>
	:global(.watfoe-content) {
		height: calc(100% - 50px);
		overflow-y: auto;
	}
</style>

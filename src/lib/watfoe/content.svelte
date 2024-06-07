<script>
	import { Flex } from '../flex';

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
	mt={50}
	{...rest}
/>

<style>
	:global(.watfoe-content) {
		min-height: calc(100% - 50px);
		overflow-y: auto;
	}
</style>

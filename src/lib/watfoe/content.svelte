<script lang="ts">
	import Flex, { type FlexAttributes } from '../flex';
	const { class: _class = '', direction = 'column', ...rest }: FlexAttributes = $props();
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
	{...rest}
/>

<style>
	:global(.watfoe-content) {
		height: calc(100% - 50px);
		overflow-y: auto;
	}
</style>

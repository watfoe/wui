<script lang="ts">
	import { Surface } from '$lib/surface';
	import type { FlexAttributes } from '../flex';

	const { class: _class = '', direction = 'column', ...rest }: FlexAttributes = $props();
</script>

<Surface
	element="main"
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

<script lang="ts">
	import { Surface, type SurfaceAttributes } from '$lib/surface';

	const { class: _class = '', direction = 'column', ...rest }: SurfaceAttributes<'main'> = $props();
</script>

<Surface
	element="main"
	align="flex-start"
	justify="flex-start"
	class="watfoe-content {_class}"
	{direction}
	width="100%"
	px="lg"
	mt={60}
	{...rest}
/>

<style>
	:global(.watfoe-content) {
		min-height: calc(100% - 60px);
		overflow-y: auto;
	}
</style>

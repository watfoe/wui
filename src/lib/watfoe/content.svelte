<script lang="ts">
	import { Surface, type SurfaceAttributes } from '$lib/surface';

	const { class: _class = '', direction = 'column', ...rest }: SurfaceAttributes<'main'> = $props();
</script>

<Surface
	element="main"
	variant="soft"
	color="neutral"
	colorweight="0"
	items="start"
	justify="start"
	class="watfoe-content {_class}"
	{direction}
	width="100%"
	px="lg"
	mt={80}
	{...rest}
/>

<style>
	:global(.watfoe-content) {
		height: calc(100% - 80px) !important;
		overflow-y: auto;
	}
</style>

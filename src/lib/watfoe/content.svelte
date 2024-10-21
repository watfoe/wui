<script lang="ts">
	import { Surface, type SurfaceAttributes } from '$lib/surface';

	const { class: _class = '', direction = 'column', ...rest }: SurfaceAttributes<'main'> = $props();
</script>

<Surface
	element="main"
	items="start"
	justify="start"
	class="watfoe-content {_class}"
	{direction}
	width="100%"
	px="lg"
	mt={70}
	{...rest}
/>

<style>
	:global(.watfoe-content) {
		min-height: calc(100% - 80px);
		overflow-y: auto;
	}
</style>

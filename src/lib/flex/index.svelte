<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	export interface FlexAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {}
</script>

<script lang="ts">
	import { Surface, type SurfaceAttributes } from '../surface';

	let { direction = 'row', ...rest }: FlexAttributes = $props();
</script>

<Surface element="div" {direction} {...rest} />

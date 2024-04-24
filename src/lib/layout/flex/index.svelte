<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	export interface FlexAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {}
</script>

<script lang="ts">
	import { Surface, type SurfaceAttributes } from '$lib/utils';
	let { children, direction = 'row', ...rest }: FlexAttributes = $props();
</script>

<Surface {direction} {...rest} element="div">
	{#if children}
		{@render children()}
	{/if}
</Surface>

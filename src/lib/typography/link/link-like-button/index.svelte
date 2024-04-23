<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface LinkLikeButtonAttributes
		extends Omit<LikeButtonAttributes<HTMLAnchorElement, HTMLAnchorAttributes>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '$lib/utils';

	let { px = 'sm', ...rest }: LinkLikeButtonAttributes = $props();
</script>

<LikeButton {...rest} element="a" {px}>
	<slot />
</LikeButton>

<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface LinkLikeButtonAttributes
		extends Omit<LikeButtonAttributes<HTMLAnchorAttributes>, 'element'> {}
</script>

<script lang="ts">
	import LikeButton, { type LikeButtonAttributes } from '../likebutton';

	let { px = 'sm', ...rest }: LinkLikeButtonAttributes = $props();
</script>

<LikeButton {...rest} element="a" {px} />

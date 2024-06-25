<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface LinkLikeButtonAttributes
		extends Omit<LikeButtonAttributes<HTMLAnchorAttributes>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';

	let { size, px = size || 'md', ...rest }: LinkLikeButtonAttributes = $props();
</script>

<LikeButton element="a" {size} {px} {...rest} />

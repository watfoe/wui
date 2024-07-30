<script context="module" lang="ts">
	export interface LinkLikeButtonAttributes extends Omit<LikeButtonAttributes<'a'>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';

	let { size, px = size || 'md', ...rest }: LinkLikeButtonAttributes = $props();
</script>

<LikeButton element="a" {size} {px} {...rest} />

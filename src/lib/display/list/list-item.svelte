<script lang="ts" context="module">
	import { type LikeButtonAttributes } from '$lib/utils';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface ListItemAttributes
		extends Omit<LikeButtonAttributes<HTMLLIElement, HTMLLiAttributes>, 'element'> {}
</script>

<script lang="ts">
	import { LikeButton } from '$lib/utils';
	import { getContext } from 'svelte';

	let { color, size, variant, ...rest }: ListItemAttributes = $props();
	let context: {
		color?: LikeButtonAttributes<HTMLLIElement>['color'];
		size?: LikeButtonAttributes<HTMLLIElement>['size'];
		variant?: LikeButtonAttributes<HTMLLIElement>['variant'];
	} = getContext('wui-tab') || {};

	color = color || context.color || 'neutral';
	size = size || context.size || 'sm';
	variant = variant || context.variant || 'plain';
</script>

<LikeButton
	{...rest}
	element="li"
	justify="flex-start"
	class="WuiListItem"
	{color}
	{size}
	{variant}
>
	<slot />
</LikeButton>

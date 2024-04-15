<script lang="ts" context="module">
	import type { WuiColor, WuiListMarker, WuiSize } from '$lib/types';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface ListItemAttributes extends HTMLLiAttributes {
		color?: WuiColor;
		size?: WuiSize;
		marker?: WuiListMarker;
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';

	let { color, size, marker, ...rest }: ListItemAttributes = $props();
	let context: {
		color?: WuiColor;
		marker?: WuiListMarker;
		size?: WuiSize;
	} = getContext('wui-tab-ctx') || {};

	color = color || context.color || 'neutral';
	size = size || context.size || 'sm';
	marker = marker || context.marker || 'circle';
</script>

<li
	{...rest}
	class="
	WuiListItem WuiListItem--{size} WuiListItem--marker-{marker}
	WuiText WuiText--body WuiText--md WuiText--{color}"
>
	<slot />
</li>

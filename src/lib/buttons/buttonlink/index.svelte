<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface ButtonLinkAttributes
		extends Omit<ButtonLikeAttributes<HTMLAnchorElement, HTMLAnchorAttributes>, 'element'> {}
</script>

<script lang="ts">
	import { ButtonLike, type ButtonLikeAttributes } from '$lib/utils';

	let { ...rest }: ButtonLinkAttributes = $props();
</script>

<ButtonLike {...rest} element="a">
	<slot />
</ButtonLike>

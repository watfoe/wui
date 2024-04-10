<script lang="ts" context="module">
	import type { LikeButtonAttributes } from '$lib';

	export interface ListAttributes extends HTMLUListElement {
		color?: LikeButtonAttributes<HTMLUListElement>['color'];
		orientation: 'horizontal' | 'vertical';
		size?: LikeButtonAttributes<HTMLUListElement>['size'];
		spacing?: LikeButtonAttributes<HTMLUListElement>['gap'] | 'none';
		variant?: LikeButtonAttributes<HTMLUListElement>['variant'];
	}
</script>

<script lang="ts">
	import './style.css';
	import { setContext } from 'svelte';

	let {
		color,
		orientation = 'vertical',
		size,
		spacing,
		variant,
		...rest
	}: ListAttributes = $props();

	setContext('wui-tab', {
		color,
		size,
		variant
	});
</script>

<ul class="WuiList WuiList--{orientation} WuiList--spacing-{spacing}">
	<slot />
</ul>

<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type LB = LikeButtonAttributes<HTMLButtonAttributes>;

	export interface ButtonAttributes extends Omit<LB, 'element' | 'navigation'> {
		disabled?: boolean;
		loading?: boolean;
	}
</script>

<script lang="ts">
	import './style.css';
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';

	let {
		class: _class = '',
		loading = false,
		disabled = false,
		size,
		px = size || 'md',
		type = 'button',
		...rest
	}: ButtonAttributes = $props();
</script>

<LikeButton
	element="button"
	class="{loading ? 'w-btn--loading ' : ''} {_class}"
	disabled={disabled || loading}
	{px}
	{size}
	{type}
	{...rest}
/>

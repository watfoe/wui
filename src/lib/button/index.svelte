<script lang="ts" module>
	export interface ButtonAttributes extends Omit<LikeButtonAttributes<'button'>, 'element'> {
		disabled?: boolean;
		loading?: boolean;
	}
</script>

<script lang="ts">
	import './style.css';
	import { LikeButton, type LikeButtonAttributes } from '../likebutton';

	let {
		class: _class,
		loading = false,
		disabled = false,
		size,
		px = size || 'md',
		prefix,
		type = 'button',
		...rest
	}: ButtonAttributes = $props();
</script>

<LikeButton
	element="button"
	class="{loading ? 'w-btn--loading ' : ''}{_class ? ` ${_class}` : ''}"
	disabled={disabled || loading}
	{prefix}
	{px}
	{size}
	{type}
	{...rest}
/>

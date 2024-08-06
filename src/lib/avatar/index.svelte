<script context="module" lang="ts">
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface AvatarAttributes extends Omit<LikeButtonAttributes<'div'>, 'element'> {
		alt?: HTMLImgAttributes['alt'];
		src?: HTMLImgAttributes['src'];
		size?: WuiSize;
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { Icon } from '../icon';
	import { LikeButton, type LikeButtonAttributes } from '$lib/likebutton';
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		_this = $bindable(),
		alt,
		color,
		children,
		size,
		src,
		shape,
		textvariant = 'heading',
		variant,
		width,
		...rest
	}: AvatarAttributes = $props();

	let ctx: {
		color?: WuiColor;
		size?: WuiSize;
		variant?: WuiVariant;
		shape?: WuiShape;
	} = getContext('wui-avatar-group-ctx') || {};

	if (shape === 'pill') {
		shape = 'circle';
	}
</script>

<LikeButton
	aria-label={alt || 'Avatar'}
	align="center"
	color={color || ctx.color || 'primary'}
	element="div"
	justify="center"
	role="img"
	shape={shape || ctx.shape || 'circle'}
	size={size || ctx.size || 'md'}
	variant={variant || ctx.variant || 'solid'}
	width={width || size || ctx.size || 'md'}
	{textvariant}
	{...rest}
	bind:_this
>
	{#if src}
		<img {src} {alt} class="w-avatar__img" />
	{:else if alt}
		{alt[0].toUpperCase()}
	{:else if !children}
		<Icon color="inherit">person</Icon>
	{:else}
		{@render children()}
	{/if}
</LikeButton>

<style>
	.w-avatar__img {
		border-radius: inherit;
		width: 100% !important;
		height: 100% !important;
		object-fit: contain;
	}
</style>

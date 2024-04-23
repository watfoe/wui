<script context="module" lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface AvatarAttributes extends SurfaceAttributes<Omit<HTMLImgAttributes, 'color'>> {
		size?: WuiSize;
	}
</script>

<script lang="ts">
	import './style.css';

	import { Text } from '$lib/typography';
	import { Icon } from '..';
	import { getContext } from 'svelte';
	import { Surface, type SurfaceAttributes } from '$lib/utils';

	let {
		color,
		class: _class = '',
		children,
		alt,
		size,
		shape,
		variant,
		style,
		...rest
	}: AvatarAttributes = $props();

	let ctx: {
		color?: WuiColor;
		size?: WuiSize;
		variant?: WuiVariant;
		shape?: WuiShape;
	} = getContext('wui-avatar-group-ctx') || {};

	$effect.pre(() => {
		if (size === 'sm') {
			shape = 'circle';
		}
	});

	// TODO: Rethink this logic
	let isColorPreset = [
		'primary',
		'neutral',
		'success',
		'warning',
		'danger',
		'black',
		'white'
	].includes(color || ctx.color || '');
</script>

<Surface
	role="img"
	aria-label={alt || 'Avatar'}
	align="center"
	justify="center"
	variant={variant || ctx.variant || 'solid'}
	shape={shape || ctx.shape || 'circle'}
	color={color || ctx.color || 'primary'}
	height={size || ctx.size || 'md'}
	width={size || ctx.size || 'md'}
	class="WuiAvatar {_class}"
	{style}
>
	{#if rest.src}
		<img src={rest.src} {...rest} {alt} class="WuiAvatar__img" />
	{:else if alt}
		<Text variant="heading" color="inherit" {size}>{alt[0].toUpperCase()}</Text>
	{:else if !children}
		<Icon color="inherit">person</Icon>
	{:else}
		<Text variant="heading" color="inherit" {size}>
			{@render children()}
		</Text>
	{/if}
</Surface>

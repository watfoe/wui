<script context="module" lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import type { WuiColor, WuiDimension, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface AvatarAttributes
		extends Omit<SurfaceAttributes<Omit<HTMLImgAttributes, 'color'>>, 'element'> {
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
		alt,
		color,
		class: _class = '',
		clickable,
		children,
		fontsize,
		height,
		m,
		mx,
		my,
		mt,
		mr,
		mb,
		ml,
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
		size,
		src,
		shape,
		variant,
		width,
		style,
		...rest
	}: AvatarAttributes = $props();

	let ctx: {
		color?: WuiColor;
		size?: WuiSize;
		variant?: WuiVariant;
		shape?: WuiShape;
	} = getContext('wui-avatar-group-ctx') || {};

	height = (height || size || ctx.size || 'md') as WuiDimension;
	width = (width || size || ctx.size || 'md') as WuiDimension;

	if (shape === 'pill') {
		shape = 'circle';
	}

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
	element="div"
	role="img"
	aria-label={alt || 'Avatar'}
	align="center"
	justify="center"
	variant={variant || ctx.variant || 'solid'}
	shape={shape || ctx.shape || 'circle'}
	color={color || ctx.color || 'primary'}
	class="WuiAvatar {_class}"
	{clickable}
	{fontsize}
	{m}
	{mx}
	{my}
	{mt}
	{mr}
	{mb}
	{ml}
	{p}
	{px}
	{py}
	{pt}
	{pr}
	{pb}
	{pl}
	{height}
	{width}
	{style}
>
	{#if src}
		<img {src} {alt} class="WuiAvatar__img" {...rest} />
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

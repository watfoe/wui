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
	import { getContext } from 'svelte';
	import Icon from '../icon/index.svelte';
	import Surface, { type SurfaceAttributes } from '$lib/utils/surface/index.svelte';

	let {
		alt,
		color,
		class: _class = '',
		clickable,
		children,
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
		textcolor,
		textcolorweight,
		textsize = size,
		textweight,
		textbold,
		textvariant = 'heading',
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
</script>

<Surface
	aria-label={alt || 'Avatar'}
	align="center"
	color={color || ctx.color || 'primary'}
	class="WuiAvatar {_class}"
	element="div"
	justify="center"
	role="img"
	shape={shape || ctx.shape || 'circle'}
	variant={variant || ctx.variant || 'solid'}
	{clickable}
	{height}
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
	{textcolor}
	{textcolorweight}
	{textsize}
	{textweight}
	{textbold}
	{textvariant}
	{width}
	{style}
>
	{#if src}
		<img {src} {alt} class="WuiAvatar__img" {...rest} />
	{:else if alt}
		{alt[0].toUpperCase()}
	{:else if !children}
		<Icon color="inherit">person</Icon>
	{:else}
		{@render children()}
	{/if}
</Surface>

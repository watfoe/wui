<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface RadioAttributes
		extends Omit<SurfaceAttributes<Omit<HTMLInputAttributes, 'size'>>, 'element' | 'textvariant'> {
		checked?: boolean;
		label: Snippet | string;
		size?: WuiSize;
	}

	const SIZES = {
		sm: 18,
		md: 22,
		lg: 26
	};
</script>

<script lang="ts">
	import './style.css';
	import { Surface, type SurfaceAttributes } from '../surface';
	import { getContext, type Snippet } from 'svelte';

	let {
		// Radio attributes
		checked = $bindable(false),
		label,
		name,
		size,
		// Surface attributes
		align,
		color,
		colorweight,
		class: _class = '',
		direction,
		gap,
		height,
		justify,
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
		self,
		shape,
		style = '',
		textalign,
		textcolor,
		textcolorweight,
		textsize,
		textweight,
		textbold,
		textitalic,
		textunderline,
		variant,
		width,
		wrap,
		// input attributes
		value = $bindable(),
		onchange,
		...rest
	}: RadioAttributes = $props();

	const ctx: {
		color: WuiColor;
		name: string;
		size: WuiSize;
		shape: WuiShape;
		variant: WuiVariant;
	} = getContext('wui-radio-group-ctx') || {};

	const id = Math.random().toString(36).substring(2, 15);
</script>

<Surface
	role="radio"
	element="label"
	aria-checked={checked}
	aria-label={typeof label === 'string' ? label : rest['aria-label']}
	class="w-radio {_class}"
	for={id}
	gap={gap || size || ctx.size || 'md'}
	textsize={textsize || size || ctx.size || 'md'}
	variant="none"
	{align}
	{colorweight}
	{direction}
	{height}
	{justify}
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
	{self}
	{style}
	{textalign}
	{textcolor}
	{textcolorweight}
	{textweight}
	{textbold}
	{textitalic}
	{textunderline}
	{width}
	{wrap}
>
	<input
		{...rest}
		class="w-hidden"
		{checked}
		name={name || ctx.name}
		type="radio"
		bind:value
		{id}
	/>

	<Surface
		element="span"
		color={color || ctx.color || 'neutral'}
		class="w-radio__thumb"
		p={2}
		shape={shape || ctx.shape || 'circle'}
		variant={variant || ctx.variant || 'outlined'}
		height={SIZES[size || ctx.size || 'md']}
		width={SIZES[size || ctx.size || 'md']}
	/>

	{#if typeof label === 'string'}
		{label}
	{:else}
		{@render label()}
	{/if}
</Surface>

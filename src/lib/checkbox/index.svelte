<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';
	export interface CheckboxAttributes
		extends Omit<SurfaceAttributes<Omit<HTMLInputAttributes, 'size'>>, 'element' | 'textvariant'> {
		checked?: boolean;
		label?: Snippet | string;
		size?: WuiSize;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '../icon';
	import { Surface, type SurfaceAttributes } from '../surface';
	import { getContext, type Snippet } from 'svelte';

	let {
		// Checkbox attributes
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
		...rest
	}: CheckboxAttributes = $props();

	const ctx: {
		color: WuiColor;
		name: string;
		size: WuiSize;
		shape: WuiShape;
		variant: WuiVariant;
	} = getContext('wui-checkbox-group-ctx') || {};

	const id = Math.random().toString(36).substring(2, 15);

	const SIZES = {
		sm: 18,
		md: 22,
		lg: 26
	};
</script>

<Surface
	role="checkbox"
	element="label"
	aria-checked={checked}
	aria-label={typeof label === 'string' ? label : rest['aria-label']}
	class="w-checkbox {_class}"
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
		name={name || ctx.name}
		tabindex="-1"
		type="checkbox"
		bind:checked
		{id}
	/>

	<Surface
		element="span"
		class="w-checkbox__thumb"
		color={color || ctx.color || 'primary'}
		shape={shape || ctx.shape || 'rounded'}
		variant={variant || ctx.variant || 'outlined'}
		height={SIZES[size || ctx.size || 'md']}
		width={SIZES[size || ctx.size || 'md']}
	>
		<Icon {size} weight="500">check</Icon>
	</Surface>

	{#if typeof label === 'string'}
		{label}
	{:else if label}
		{@render label()}
	{/if}
</Surface>

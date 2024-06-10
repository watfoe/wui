<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface RadioAttributes
		extends Omit<SurfaceAttributes<Omit<HTMLInputAttributes, 'size'>>, 'element' | 'textvariant'> {
		checked?: boolean;
		indicator?: Snippet | string;
		label?: Snippet | string;
		size?: WuiSize;
	}

	const SIZES = {
		xs: 18,
		sm: 20,
		md: 24,
		lg: 28,
		xl: 34
	};
</script>

<script lang="ts">
	import './style.css';
	import { Surface, type SurfaceAttributes } from '../surface';
	import { getContext, type Snippet } from 'svelte';
	import { Icon } from '$lib/icon';
	import { on } from 'svelte/events';

	let {
		// Radio attributes
		checked = $bindable(false),
		label,
		name,
		size,
		// Surface attributes
		align = 'center',
		color,
		colorweight,
		class: _class = '',
		direction = 'row',
		indicator,
		gap = 'md',
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

	color = color || ctx.color || 'neutral';

	function change(event: Event & { currentTarget: HTMLInputElement }) {
		checked = (event.target as HTMLInputElement).checked;
		onchange?.(event);
	}
</script>

<Surface
	role="radio"
	element="label"
	aria-checked={checked}
	aria-label={typeof label === 'string' ? label : rest['aria-label']}
	class="w-radio{indicator ? ' w-radio--with-indicator' : ''} {_class}"
	for={id}
	textsize={textsize || size || ctx.size || 'md'}
	variant="none"
	{align}
	{direction}
	{height}
	{gap}
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
		class="w-hidden"
		name={name || ctx.name}
		type="radio"
		bind:value
		{checked}
		{id}
		onchange={change}
		{...rest}
	/>

	<Surface
		element="span"
		colorweight={colorweight || (color === 'neutral' && variant === 'outlined' ? '5' : undefined)}
		class="w-radio__thumb"
		shape={shape || ctx.shape || 'circle'}
		variant={variant || ctx.variant || 'outlined'}
		height={SIZES[size || ctx.size || 'md']}
		width={SIZES[size || ctx.size || 'md']}
		{color}
	>
		{#if typeof indicator === 'string'}
			<Icon class="w-radio__thumb__indicator" color="inherit" {size}>{indicator}</Icon>
		{:else if indicator}
			<div class="w-radio__thumb__indicator">
				{@render indicator()}
			</div>
		{/if}
	</Surface>

	{#if typeof label === 'string'}
		{label}
	{:else if label}
		{@render label()}
	{/if}
</Surface>

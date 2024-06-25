<script context="module" lang="ts">
	import type {
		WuiFlexKeys,
		WuiFlexJustify,
		WuiSurface,
		WuiSurfaceTextAttributes
	} from '$lib/types';
	import { type Snippet } from 'svelte';

	export type SurfaceAttributes<A> = A &
		WuiSurface &
		WuiFlexKeys &
		WuiSurfaceTextAttributes & {
			_this?: HTMLElement;
			children?: Snippet;
			clickable?: boolean;
			element?: string;
			justify?: WuiFlexJustify;
			navigation?: 'vertical' | 'horizontal' | 'mixed' | 'none';
		};
</script>

<script lang="ts">
	import './style.css';
	import '../styles/flex.css';
	import '../styles/text.css';
	import '../styles/size.css';

	import {
		construct_color_style,
		construct_size_style,
		construct_spacing_class,
		construct_flex_class,
		construct_size_class,
		construct_spacing_style,
		construct_flex_gap_style
	} from './construct-styles';

	let {
		_this = $bindable(),
		align,
		element = 'div',
		color,
		colorweight,
		class: _class,
		clickable = false,
		children,
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
		textsize = 'md',
		textweight,
		textbold,
		textitalic,
		textunderline,
		textvariant = 'body',
		variant,
		width,
		wrap,
		...rest
	}: SurfaceAttributes<any> = $props();
</script>

<!-- Svelte throws warning on self-closing tags -->
{#if element === 'input'}
	<svelte:element
		this={'input'}
		class="{construct_flex_class(direction, justify, align, self, wrap, gap)}{construct_size_class(
			'h',
			height
		)}{construct_size_class('w', width)}{construct_spacing_class(
			'margin',
			mt,
			mr,
			mb,
			ml,
			m,
			mx,
			my
		)}{construct_spacing_class(
			'padding',
			pt,
			pr,
			pb,
			pl,
			p,
			px,
			py
		)}w-txt w-txt--{textvariant} w-txt--{textsize}{textbold ? ' bold ' : ''}{textitalic
			? ' italic'
			: ''}{textalign ? ` w-txt--align-${textalign}` : ''}{textunderline
			? ' underline'
			: ''}{variant ? ` w-${variant}` : ''}{color ? ` w-${color}` : ''}{shape
			? ` w-${shape}`
			: ''}{clickable ? ' w-clickable' : ''}{_class ? ` ${_class}` : ''}"
		style="{construct_color_style(
			color,
			variant,
			colorweight,
			textcolor,
			textcolorweight,
			clickable
		)}{construct_size_style('h', height)}{construct_size_style('w', width)}{construct_spacing_style(
			'margin',
			mt,
			mr,
			mb,
			ml,
			m,
			mx,
			my
		)}{construct_spacing_style('padding', pt, pr, pb, pl, p, px, py)}{construct_flex_gap_style(
			gap
		)}{style}"
		bind:this={_this}
		{...rest}
	/>
{:else}
	<svelte:element
		this={element}
		class="{construct_flex_class(direction, justify, align, self, wrap, gap)}{construct_size_class(
			'h',
			height
		)}{construct_size_class('w', width)}{construct_spacing_class(
			'margin',
			mt,
			mr,
			mb,
			ml,
			m,
			mx,
			my
		)}{construct_spacing_class(
			'padding',
			pt,
			pr,
			pb,
			pl,
			p,
			px,
			py
		)}w-txt w-txt--{textvariant} w-txt--{textsize}{textbold ? ' bold ' : ''}{textitalic
			? ' italic'
			: ''}{textalign ? ` w-txt--align-${textalign}` : ''}{textunderline
			? ' underline'
			: ''}{variant ? ` w-${variant}` : ''}{color ? ` w-${color}` : ''}{shape
			? ` w-${shape}`
			: ''}{clickable ? ' w-clickable' : ''}{_class ? ` ${_class}` : ''}"
		style="{construct_color_style(
			color,
			variant,
			colorweight,
			textcolor,
			textcolorweight,
			clickable
		)}{construct_size_style('h', height)}{construct_size_style('w', width)}{construct_spacing_style(
			'margin',
			mt,
			mr,
			mb,
			ml,
			m,
			mx,
			my
		)}{construct_spacing_style('padding', pt, pr, pb, pl, p, px, py)}{construct_flex_gap_style(
			gap
		)}{style}"
		bind:this={_this}
		{...rest}
	>
		{#if children}
			{@render children()}
		{/if}
	</svelte:element>
{/if}

<script context="module" lang="ts">
	import type {
		WuiFlexKeys,
		WuiFlexJustify,
		WuiSurface,
		WuiSize,
		WuiSurfaceHTMLAttributes,
		WuiSurfaceElement
	} from '$lib/types';
	import { type Snippet } from 'svelte';

	export type SurfaceAttributes<A = WuiSurfaceHTMLAttributes> = A &
		WuiSurface &
		WuiFlexKeys & {
			bold?: boolean;
			children?: Snippet;
			clickable?: boolean;
			element?: WuiSurfaceElement;
			justify?: WuiFlexJustify;
			navigation?: 'vertical' | 'horizontal' | 'mixed' | 'none';
			fontsize?: WuiSize;
		};

	const SPACES = ['ss', 'xs', 'sm', 'md', 'lg', 'xl', 'xx'];

	function construct_spacing_style(
		type: 'margin' | 'padding',
		which: 'top' | 'right' | 'bottom' | 'left',
		style: string,
		value?: string | number
	) {
		if (value) {
			if (typeof value === 'number') {
				style += `${type}-${which}:${value}px;`;
			} else if (SPACES.includes(value)) {
				style += `${type}-${which}:var(--space-${value},var(--space-md));`;
			} else {
				style += `${type}-${which}:${value};`;
			}
		}

		return style;
	}

	function construct_dimension_style(
		which: 'height' | 'width',
		style: string,
		value?: string | number
	) {
		if (value) {
			if (typeof value === 'number') {
				style += `${which}:${value}px;`;
			} else if (SPACES.includes(value)) {
				style += `${which}:var(--height-${value}, auto);`;
			} else {
				style += `${which}:${value};`;
			}
		}

		return style;
	}
</script>

<script lang="ts">
	import './style.css';
	let {
		align,
		element = 'div',
		color,
		class: _class = '',
		clickable = false,
		children,
		direction,
		gap,
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
		height,
		variant,
		shape,
		style = '',
		fontsize,
		width,
		wrap,
		...rest
	}: SurfaceAttributes<WuiSurfaceHTMLAttributes> = $props();

	let _style = '';
	_style = construct_dimension_style('height', _style, height);
	_style = construct_dimension_style('width', _style, width);
	_style = construct_spacing_style('margin', 'top', _style, mt || m || my);
	_style = construct_spacing_style('margin', 'right', _style, mr || m || mx);
	_style = construct_spacing_style('margin', 'bottom', _style, mb || m || my);
	_style = construct_spacing_style('margin', 'left', _style, ml || m || mx);
	_style = construct_spacing_style('padding', 'top', _style, pt || py || p);
	_style = construct_spacing_style('padding', 'right', _style, pr || px || p);
	_style = construct_spacing_style('padding', 'bottom', _style, pb || py || p);
	_style = construct_spacing_style('padding', 'left', _style, pl || px || p);

	if (direction || justify || align) {
		_style += `
				display:flex;
				flex-direction:${direction || 'row'};
				justify-content:${justify || 'flex-start'};
				align-items:${align || 'center'};
				flex-wrap:${wrap || 'nowrap'};
				${gap ? `gap:var(--space-${gap});` : ''}`;
	}
</script>

<svelte:element
	this={element}
	class="WuiText WuiText--body WuiText--{fontsize || 'md'} {variant
		? `WuiVariant-${variant} `
		: ''}{color ? `WuiColor-${color} ` : ''}{shape ? `WuiShape-${shape} ` : ''}{clickable
		? 'WuiClickable '
		: ''}{_class}"
	style="{_style}{style}"
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

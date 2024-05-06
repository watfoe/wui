<script context="module" lang="ts">
	import type {
		WuiFlexKeys,
		WuiFlexJustify,
		WuiSurface,
		WuiSize,
		WuiSurfaceHTMLAttributes,
		WuiSurfaceElement,
		WuiVariant,
		WuiFlexDirection,
		WuiFlexAlign,
		WuiFlexWrap,
		WuiFlexGap
	} from '$lib/types';
	import { type Snippet } from 'svelte';

	export type SurfaceAttributes<A = WuiSurfaceHTMLAttributes> = Omit<A, 'color'> &
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
		value?: string | number
	) {
		if (value) {
			if (typeof value === 'number') {
				return `${type}-${which}:${value}px;`;
			} else if (SPACES.includes(value)) {
				return `${type}-${which}:var(--space-${value},var(--space-md));`;
			} else {
				return `${type}-${which}:${value};`;
			}
		}

		return '';
	}

	function construct_dimension_style(which: 'height' | 'width', value?: string | number) {
		if (value) {
			if (typeof value === 'number') {
				return `--WuiDimen-${which}:${value}px;`;
			} else if (SPACES.includes(value)) {
				return `--WuiDimen-${which}:var(--height-${value});`;
			} else {
				return `--WuiDimen-${which}:${value};`;
			}
		}

		return '';
	}

	function construct_color_style(color?: string, variant?: WuiVariant, weight?: string) {
		let color_bg = `var(--color-${color}-${weight || '5'})`;
		let color_on_bg = 'var(--color-white)';
		let color_bg_soft = `var(--color-${color}-${weight || '1'})`;

		if (color === 'white') {
			color_bg = `var(--color-${color})`;
			color_on_bg = 'var(--color-black)';
			color_bg_soft = `var(--color-neutral-${weight || '1'})`;
		} else if (color === 'black') {
			color_bg = `var(--color-${color})`;
			color_on_bg = 'var(--color-white)';
			color_bg_soft = `var(--color-neutral-${weight || '1'})`;
		}
		if (variant !== 'solid') {
			if (color === 'neutral') {
				if ((variant === 'outlined' || variant === 'mixed') && !weight) {
					color_bg = 'var(--color-neutral-3)';
				}
				color_on_bg = 'var(--color-neutral-8)';
			} else {
				color_on_bg = color_bg;
			}
		}

		if (color) {
			return `
				--WuiColor-bg: ${color_bg};
				--WuiColor-on-bg: ${color_on_bg};
				--WuiColor-bg-soft: ${color_bg_soft};
			`;
		}

		return '';
	}

	function construct_flex_style(
		direction?: WuiFlexDirection,
		justify?: WuiFlexJustify,
		align?: WuiFlexAlign,
		wrap?: WuiFlexWrap,
		gap?: WuiFlexGap
	) {
		if (direction || justify || align || wrap || gap) {
			return `
				display:flex;
				flex-direction:${direction || 'row'};
				justify-content:${justify || 'flex-start'};
				align-items:${align || 'center'};
				flex-wrap:${wrap || 'nowrap'};
				${gap ? `gap:var(--space-${gap});` : ''}
			`;
		}

		return '';
	}
</script>

<script lang="ts">
	import './style.css';
	let {
		align,
		element = 'div',
		color,
		colorweight,
		class: _class = '',
		clickable = false,
		children,
		direction,
		disabled,
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
</script>

<svelte:element
	this={element}
	class="WuiSurface WuiText WuiText--body WuiText--{fontsize || 'md'} {variant
		? `WuiVariant-${variant} `
		: ''}{color ? `WuiColor-${color} ` : ''}{shape ? `WuiShape-${shape} ` : ''}{clickable
		? 'WuiClickable '
		: ''}{_class}"
	{disabled}
	data-has-width={width ? 'true' : 'false'}
	data-has-height={height ? 'true' : 'false'}
	style="
		{construct_flex_style(direction, justify, align, wrap, gap)}
		{construct_dimension_style('height', height)}
		{construct_dimension_style('width', width)}
		{construct_spacing_style('margin', 'top', mt || m || my)}
		{construct_spacing_style('margin', 'right', mr || m || mx)}
		{construct_spacing_style('margin', 'bottom', mb || m || my)}
		{construct_spacing_style('margin', 'left', ml || m || mx)}
		{construct_spacing_style('padding', 'top', pt || py || p)}
		{construct_spacing_style('padding', 'right', pr || px || p)}
		{construct_spacing_style('padding', 'bottom', pb || py || p)}
		{construct_spacing_style('padding', 'left', pl || px || p)}
		{construct_color_style(color, variant, colorweight)}
		{style}
	"
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

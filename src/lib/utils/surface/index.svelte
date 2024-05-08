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
		WuiFlexGap,
		WuiSurfaceTextAttributes,
		WuiColor,
		WuiColorWeight,
		WuiFlexAlignSelf
	} from '$lib/types';
	import { type Snippet } from 'svelte';

	export type SurfaceAttributes<A = WuiSurfaceHTMLAttributes> = Omit<A, 'color'> &
		WuiSurface &
		WuiFlexKeys &
		WuiSurfaceTextAttributes & {
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

	function construct_color_style(
		color?: WuiColor,
		variant?: WuiVariant,
		weight?: WuiColorWeight,
		textcolor?: WuiColor,
		textweight?: WuiColorWeight
	) {
		if (color === 'inherit') {
			return `
				--WuiColor-bg: inherit;
				--WuiColor-on-bg: inherit;
				--WuiColor-bg-soft: inherit;
			`;
		}

		if (!textweight && (textcolor === 'neutral' || color === 'neutral')) {
			textweight = '8';
		} else {
			textweight = textweight || '5';
		}

		if (variant === 'plain' || variant === 'none') {
			// bg soft is used for hover effect
			return `
				--WuiColor-bg: none;
				--WuiColor-on-bg: ${compute_color_value(textcolor || color || 'black', textweight)};
				--WuiColor-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-1);
			`;
		} else if (variant === 'soft') {
			color = color || 'primary';

			if (!textweight && color === 'neutral') {
				textweight = '8';
			}

			return `
				--WuiColor-bg: none;
				--WuiColor-on-bg: ${compute_color_value(textcolor || color, textweight)};
				--WuiColor-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-${weight || '1'});
			`;
		} else if (variant === 'solid') {
			if (color === 'white') {
				textcolor = 'black';
			} else if (color === 'black') {
				textcolor = 'white';
			} else {
				color = color || 'primary';
			}

			return `
				--WuiColor-bg: ${compute_color_value(color, weight)};
				--WuiColor-on-bg: ${compute_color_value(textcolor || 'white', textweight)};
				--WuiColor-bg-soft: none;
			`;
		} else if (variant === 'outlined') {
			if (color === 'neutral') {
				weight = weight || '3';
			} else {
				color = color || 'primary';
				weight = weight || '5';
			}

			// The bg color is used for the border color
			// while the bg soft is used for the hover effect
			return `
				--WuiColor-bg: ${compute_color_value(color, weight)};
				--WuiColor-on-bg: ${compute_color_value(textcolor || color, textweight)};
				--WuiColor-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-1);
			`;
		} else if (variant === 'mixed') {
			if (color === 'neutral') {
				weight = weight || '3';
			} else {
				color = color || 'primary';
				weight = weight || '5';
			}

			return `
				--WuiColor-bg: ${compute_color_value(color, weight)};
				--WuiColor-on-bg: ${compute_color_value(textcolor || color, textweight)};
				--WuiColor-bg-soft: var(--color-${color === 'black' || color === 'white' ? 'neutral' : color}-${weight || '1'});
			`;
		}

		return '';
	}

	function compute_color_value(color: WuiColor, weight?: WuiColorWeight) {
		if (color === 'white') {
			return 'var(--color-white)';
		} else if (color === 'black') {
			return 'var(--color-black)';
		} else {
			return `var(--color-${color}-${weight || '5'})`;
		}
	}

	function construct_flex_style(
		direction?: WuiFlexDirection,
		justify?: WuiFlexJustify,
		align?: WuiFlexAlign,
		self?: WuiFlexAlignSelf,
		wrap?: WuiFlexWrap,
		gap?: WuiFlexGap
	) {
		if (direction || justify || align || wrap || gap) {
			return `
				display:flex;
				align-items:${align || 'center'};
				${justify ? `justify-content:${justify};` : ''}
				${wrap ? 'flex-wrap:wrap;' : ''}
				${direction ? `flex-direction:${direction};` : ''}
				${self ? `align-self:${self};` : ''}
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
	}: SurfaceAttributes<WuiSurfaceHTMLAttributes> = $props();
</script>

<svelte:element
	this={element}
	class="WuiSurface WuiText WuiText--{textvariant} WuiText--{textsize} {textbold
		? 'WuiText--bold '
		: ''}{textitalic ? 'WuiText--italic ' : ''}{textunderline ? 'WuiText--underline ' : ''}{variant
		? `WuiVariant-${variant} `
		: ''}{color ? `WuiColor-${color} ` : ''}{shape ? `WuiShape-${shape} ` : ''}{clickable
		? 'WuiClickable '
		: ''}{_class}"
	{disabled}
	data-has-width={width ? 'true' : 'false'}
	data-has-height={height ? 'true' : 'false'}
	style="
		{construct_flex_style(direction, justify, align, self, wrap, gap)}
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
		{construct_color_style(color, variant, colorweight, textcolor, textcolorweight)}
		{style}
	"
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

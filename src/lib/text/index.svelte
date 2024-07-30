<script context="module" lang="ts">
	import type {
		WuiColor,
		WuiColorWeight,
		WuiFlexAlign,
		WuiTextAlign,
		WuiTextSize,
		WuiTextWeight,
		WuiVariant
	} from '$lib/types';

	export type BaseTextAttributes<E extends keyof svelteHTML.IntrinsicElements> = Omit<
		SurfaceAttributes<E>,
		| 'element'
		| 'textalign'
		| 'textbold'
		| 'textcolor'
		| 'textitalic'
		| 'textsize'
		| 'textunderline'
		| 'textweight'
		| 'textvariant'
		| 'align'
		| 'variant'
	> & {
		align?: WuiTextAlign;
		bold?: boolean;
		italic?: boolean;
		size?: WuiTextSize;
		underline?: boolean;
		weight?: WuiTextWeight;
		surfacealign?: WuiFlexAlign;
		surfacevariant?: WuiVariant;
		surfacecolor?: WuiColor;
		surfacecolorweight?: WuiColorWeight;
	};

	export type TextAnchorAttributes = BaseTextAttributes<'a'> & {
		variant: 'a';
	};
	export type TextLabelAttributes = BaseTextAttributes<'label'> & {
		variant: 'label';
	};
	export type TextHeadingAttributes = BaseTextAttributes<'h1'> & {
		variant: 'heading' | 'title';
	};
	export type TextBodyAttributes = BaseTextAttributes<'span'> & {
		variant?: 'body';
	};

	export type TextAttributes =
		| TextLabelAttributes
		| TextHeadingAttributes
		| TextBodyAttributes
		| TextAnchorAttributes;
</script>

<script lang="ts">
	import { Surface, type SurfaceAttributes } from '../surface';

	let {
		_this = $bindable(),
		align,
		bold,
		color = 'inherit',
		colorweight,
		italic = false,
		size = 'md',
		underline = false,
		variant = 'body',
		weight,
		surfacealign,
		surfacecolor,
		surfacecolorweight,
		surfacevariant = 'none',
		...rest
	}: TextAttributes = $props();

	// For title and heading, there are no ss and xl sizes
	const elements = {
		title: {
			lg: 'h1',
			md: 'h2',
			sm: 'h3'
		},
		heading: {
			lg: 'h4',
			md: 'h5',
			sm: 'h6'
		},
		body: 'span',
		label: 'label',
		a: 'a'
	};

	let element = '';
	if (variant === 'title' || variant === 'heading') {
		if (size === 'xs') {
			size = 'sm';
		} else if (size === 'xl') {
			size = 'lg';
		}

		element = elements[variant][size || 'md'];
	} else {
		element = elements[variant];
	}
</script>

<Surface
	textalign={align}
	textsize={size}
	textbold={bold || variant === 'heading' || variant === 'title'}
	textcolor={color}
	textcolorweight={colorweight}
	textitalic={italic}
	textunderline={underline}
	textvariant={variant}
	textweight={weight}
	align={surfacealign}
	color={surfacecolor}
	colorweight={surfacecolorweight}
	variant={surfacevariant}
	{element}
	{...rest}
	bind:_this
/>

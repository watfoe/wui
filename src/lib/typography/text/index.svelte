<script context="module" lang="ts">
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';

	type TextSurfaceAttributes<A> = Omit<
		SurfaceAttributes<A>,
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
	>;

	export type TextAnchorAttributes = TextSurfaceAttributes<HTMLAnchorAttributes> & {
		variant: 'a';
	};
	export type TextLabelAttributes = TextSurfaceAttributes<HTMLLabelAttributes> & {
		variant: 'label';
	};
	export type TextHeadingAttributes = TextSurfaceAttributes<HTMLAttributes<HTMLHeadingElement>> & {
		variant: 'heading' | 'title';
	};
	export type TextBodyAttributes = TextSurfaceAttributes<HTMLAttributes<HTMLSpanElement>> & {
		variant?: 'body';
	};

	type BaseTextAttributes =
		| TextLabelAttributes
		| TextHeadingAttributes
		| TextBodyAttributes
		| TextAnchorAttributes;

	export type TextAttributes = BaseTextAttributes & {
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
</script>

<script lang="ts">
	import { Surface, type SurfaceAttributes } from '$lib/utils';
	import type {
		WuiColor,
		WuiColorWeight,
		WuiFlexAlign,
		WuiTextAlign,
		WuiTextSize,
		WuiTextWeight,
		WuiVariant
	} from '$lib/types';

	let {
		align,
		bold,
		color = 'inherit',
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
		code: 'code',
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
	{element}
	textalign={align}
	textsize={size}
	textbold={bold || variant === 'heading' || variant === 'title'}
	textcolor={color}
	textitalic={italic}
	textunderline={underline}
	textvariant={variant}
	textweight={weight}
	align={surfacealign}
	color={surfacecolor}
	colorweight={surfacecolorweight}
	variant={surfacevariant}
	{...rest}
/>

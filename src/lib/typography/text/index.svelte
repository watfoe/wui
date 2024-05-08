<script context="module" lang="ts">
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';
	import type { WuiColor, WuiSurface, WuiTextSize, WuiTextWeight } from '$lib/types';

	export interface TextLabelAttributes extends Omit<HTMLLabelAttributes, 'color'> {
		variant: 'label';
	}
	export interface TextHeadingAttributes extends HTMLAttributes<HTMLHeadingElement> {
		variant: 'heading' | 'title';
	}
	export interface TextBodyAttributes extends HTMLAttributes<HTMLSpanElement> {
		variant?: 'body' | 'code';
	}

	export interface TextAnchorAttributes extends Omit<HTMLAnchorAttributes, 'color'> {
		variant?: 'a';
	}

	export interface BaseTextAttributes extends Omit<WuiSurface, 'color' | 'variant'> {
		bold?: boolean;
		color?: WuiColor;
		italic?: boolean;
		size?: WuiTextSize;
		underline?: boolean;
		weight?: WuiTextWeight;
		bgvariant?: WuiSurface['variant'];
		bgcolor?: WuiSurface['color'];
	}

	export type TextAttributes = BaseTextAttributes &
		(TextLabelAttributes | TextHeadingAttributes | TextBodyAttributes | TextAnchorAttributes);
</script>

<script lang="ts">
	import { Surface } from '$lib/utils';

	let {
		bold,
		color = 'black',
		italic = false,
		size = 'md',
		underline = false,
		variant = 'body',
		weight,
		style,
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
	textsize={size}
	textweight={weight}
	textbold={bold || variant === 'heading' || variant === 'title'}
	textcolor={color}
	textitalic={italic}
	textunderline={underline}
	textvariant={variant}
	style="font-weight={weight};{style}"
	variant="plain"
	{...rest}
/>

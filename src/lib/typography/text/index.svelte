<script context="module" lang="ts">
	import type { HTMLAnchorAttributes, HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';
	import type { WuiColor, WuiTextSize, WuiTextWeight } from '$lib/types';

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

	export interface BaseTextAttributes {
		bold?: boolean;
		color?: WuiColor | 'inherit';
		italic?: boolean;
		size?: WuiTextSize;
		underline?: boolean;
		weight?: WuiTextWeight;
	}

	export type TextAttributes = BaseTextAttributes &
		(TextLabelAttributes | TextHeadingAttributes | TextBodyAttributes | TextAnchorAttributes);
</script>

<script lang="ts">
	import './style.css';

	let {
		bold,
		color = 'black',
		children,
		class: _class = '',
		italic = false,
		size = 'md',
		underline = false,
		variant = 'body',
		weight,
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

<svelte:element
	this={element}
	class="WuiText WuiText--{variant} WuiText--{size} WuiText--{color}{bold ||
	variant === 'heading' ||
	variant === 'title'
		? ' WuiText--bold'
		: ''} {italic ? ' WuiText--italic' : ''}{underline ? ' WuiText--underline' : ''} {_class}"
	style:font-weight={weight}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

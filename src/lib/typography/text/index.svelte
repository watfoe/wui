<script context="module" lang="ts">
	import type { HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';
	import type { WuiColor, WuiSize, WuiTextWeight } from '$lib/types';

	export interface TextLabelAttributes extends Omit<HTMLLabelAttributes, 'color'> {
		variant: 'label';
	}
	export interface TextHeadingAttributes extends HTMLAttributes<HTMLHeadingElement> {
		variant: 'heading' | 'title';
	}
	export interface TextBodyAttributes extends HTMLAttributes<HTMLSpanElement> {
		variant?: 'body' | 'code';
	}

	export type TextAttributes = {
		bold?: boolean;
		color?: WuiColor | 'inherit';
		italic?: boolean;
		rtl?: boolean;
		size?: WuiSize;
		underline?: boolean;
		weight?: WuiTextWeight;
	} & (TextLabelAttributes | TextHeadingAttributes | TextBodyAttributes);
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

	const elements = {
		title: {
			sm: 'h3',
			md: 'h2',
			lg: 'h1'
		},
		heading: {
			sm: 'h6',
			md: 'h5',
			lg: 'h4'
		},
		body: {
			sm: 'span',
			md: 'span',
			lg: 'span'
		},
		label: {
			sm: 'label',
			md: 'label',
			lg: 'label'
		},
		code: {
			sm: 'code',
			md: 'code',
			lg: 'code'
		}
	};
</script>

<svelte:element
	this={elements[variant || 'body'][size || 'md']}
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

<script context="module" lang="ts">
	import type {
		WuiFlexKeys,
		WuiFlexJustify,
		WuiSurface,
		WuiSurfaceHTMLAttributes,
		WuiSurfaceTextAttributes
	} from '$lib/types';
	import { type Snippet } from 'svelte';

	export type SurfaceAttributes<A> = A &
		WuiSurface &
		WuiFlexKeys &
		WuiSurfaceTextAttributes & {
			children?: Snippet;
			clickable?: boolean;
			element?: string;
			justify?: WuiFlexJustify;
			navigation?: 'vertical' | 'horizontal' | 'mixed' | 'none';
		};

	type InputSurfaceAttributes = SurfaceAttributes<HTMLInputAttributes> & {
		element: 'input';
	};

	type OtherSurfaceAttributes = SurfaceAttributes<WuiSurfaceHTMLAttributes> & {
		element?: Omit<string, 'input'>;
	};
</script>

<script lang="ts">
	import './style.css';
	import {
		construct_color_style,
		construct_size_style,
		construct_flex_style,
		construct_spacing_style
	} from './construct-styles';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		align,
		element = 'div',
		color,
		colorweight,
		class: _class = '',
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
	}: InputSurfaceAttributes | OtherSurfaceAttributes = $props();
</script>

{#if element === 'input'}
	<svelte:element
		this={element}
		class="w-txt w-txt--{textvariant} w-txt--{textsize} {textbold ? 'bold ' : ''}{textitalic
			? 'italic '
			: ''}{textalign ? `w-txt--align-${textalign} ` : ''}{textunderline
			? 'underline '
			: ''}{variant ? `w-${variant} ` : ''}{color ? `w-${color} ` : ''}{shape
			? `w-${shape} `
			: ''}{clickable ? 'w-clickable ' : ''}{_class}"
		data-w={width ? '1' : '0'}
		data-h={height ? '1' : '0'}
		style="{construct_size_style('height', height)}{construct_size_style(
			'width',
			width
		)}{construct_color_style(
			color,
			variant,
			colorweight,
			textcolor,
			textcolorweight,
			clickable
		)}{construct_spacing_style('margin', 'top', mt || m || my)}{construct_spacing_style(
			'margin',
			'right',
			mr || m || mx
		)}{construct_spacing_style('margin', 'bottom', mb || m || my)}{construct_spacing_style(
			'margin',
			'left',
			ml || m || mx
		)}{construct_spacing_style('padding', 'top', pt || py || p)}{construct_spacing_style(
			'padding',
			'right',
			pr || px || p
		)}{construct_spacing_style('padding', 'bottom', pb || py || p)}{construct_spacing_style(
			'padding',
			'left',
			pl || px || p
		)}{style}"
		{...rest} />
{:else}
	<svelte:element
		this={element}
		class="w-txt w-txt--{textvariant} w-txt--{textsize} {textbold ? 'bold ' : ''}{textitalic
			? 'italic '
			: ''}{textalign ? `w-txt--align-${textalign} ` : ''}{textunderline
			? 'underline '
			: ''}{variant ? `w-${variant} ` : ''}{color ? `w-${color} ` : ''}{shape
			? `w-${shape} `
			: ''}{clickable ? 'w-clickable ' : ''}{_class}"
		data-w={width ? '1' : '0'}
		data-h={height ? '1' : '0'}
		style="{construct_size_style('height', height)}{construct_size_style(
			'width',
			width
		)}{construct_color_style(
			color,
			variant,
			colorweight,
			textcolor,
			textcolorweight,
			clickable
		)}{construct_flex_style(direction, justify, align, self, wrap, gap)}{construct_spacing_style(
			'margin',
			'top',
			mt || m || my
		)}{construct_spacing_style('margin', 'right', mr || m || mx)}{construct_spacing_style(
			'margin',
			'bottom',
			mb || m || my
		)}{construct_spacing_style('margin', 'left', ml || m || mx)}{construct_spacing_style(
			'padding',
			'top',
			pt || py || p
		)}{construct_spacing_style('padding', 'right', pr || px || p)}{construct_spacing_style(
			'padding',
			'bottom',
			pb || py || p
		)}{construct_spacing_style('padding', 'left', pl || px || p)}{style}"
		{...rest}>
		{#if children}
			{@render children()}
		{/if}
	</svelte:element>
{/if}

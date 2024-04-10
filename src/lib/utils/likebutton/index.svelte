<script context="module" lang="ts">
	export type LikeButtonAttributes<T extends HTMLElement, A = HTMLAttributes<T>> = A & {
		bold?: boolean;
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		disabled?: boolean;
		element: string;
		gap?: 'sm' | 'nm' | 'md' | 'lg';
		height?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
		justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
		loading?: boolean;
		prefix?: string;
		rounded?: boolean;
		size?: 'sm' | 'md' | 'lg';
		suffix?: string;
		variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
		width?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
	};
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		bold = false,
		element,
		gap = 'nm',
		size = 'md',
		variant = 'solid',
		color = 'primary',
		loading = false,
		disabled = false,
		justify = 'center',
		prefix,
		rounded = false,
		suffix,
		width,
		height,
		...rest
	}: LikeButtonAttributes<any, any> = $props();
</script>

<svelte:element
	this={element}
	{...rest}
	disabled={loading || disabled}
	class="WuiLikeButton WuiLikeButton--{variant} WuiLikeButton--{size} WuiLikeButton--{color} WuiLikeButton--gap-{gap} {width
		? 'WuiLikeButton--width-' + width
		: ''} {height ? 'WuiLikeButton--height-' + height : ''} {!$$slots.default
		? 'WuiLikeButton--only-icon'
		: ''} {loading ? 'WuiLikeButton--loading' : ''} {rest.class || ''}"
	style="{rest.style || ''};--WuiLikeButtonFlex-justify:{justify};{rounded
		? '--WuiLikeButton-radius:calc(var(--WuiLikeButton-height) / 2);'
		: ''}"
>
	{#if $$slots.prefix}
		<slot name="prefix" />
	{:else if prefix}
		<Icon {size}>{prefix}</Icon>
	{/if}

	{#if $$slots.default}
		<Text variant="body" {bold}><slot /></Text>
	{/if}

	{#if $$slots.suffix}
		<slot name="suffix" />
	{:else if suffix}
		<Icon {size}>{suffix}</Icon>
	{/if}
</svelte:element>

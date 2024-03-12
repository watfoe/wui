<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface ButtonLinkAttributes extends HTMLAnchorAttributes {
		_this?: HTMLAnchorElement;
		bold?: boolean;
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
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
	}
</script>

<script lang="ts">
	import '../button/style.css';
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';

	let {
		_this,
		bold = false,
		gap = 'nm',
		size = 'md',
		variant = 'solid',
		color = 'primary',
		loading = false,
		justify = 'center',
		prefix,
		rounded = false,
		suffix,
		width,
		height,
		onclick,
		...rest
	} = $props<ButtonLinkAttributes>();
</script>

<a
	{...rest}
	class="WuiButton WuiButton--{variant} WuiButton--{size} WuiButton--{color} WuiButton--gap-{gap} {width
		? 'WuiButton--width-' + width
		: ''} {height ? 'WuiButton--height-' + height : ''} {!$$slots.default
		? 'WuiButton--only-icon'
		: ''} {rest.class || ''}"
	style="{rest.style || ''};--WuiButtonFlex-justify:{justify};{rounded
		? '--WuiButton-radius:calc(var(--WuiButton-height) / 2);'
		: ''}"
	bind:this={_this}
>
	{#if loading}
		<span class="WuiButton__loader" />
	{:else}
		{#if $$slots.prefix}
			<slot name="prefix" />
		{:else if prefix}
			<Icon {size}>{prefix}</Icon>
		{/if}

		{#if $$slots.default}
			<Text {bold} size="md" class="WuiButton__text">
				<slot />
			</Text>
		{/if}

		{#if $$slots.suffix}
			<slot name="suffix" />
		{:else if suffix}
			<Icon {size}>{suffix}</Icon>
		{/if}
	{/if}
</a>

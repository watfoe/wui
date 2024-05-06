<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WuiFlexAlign, WuiSize } from '$lib/types';

	export interface SnackbarAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element' | 'prefix'> {
		align?: WuiFlexAlign;
		openned?: boolean;
		position?:
			| 'top'
			| 'center'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right';
		prefix?: Snippet | string;
		showclose?: boolean;
		size?: WuiSize;
		title?: string;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Col } from '$lib/layout';
	import { Button } from '$lib/buttons';
	import { Icon } from '$lib/display';
	import { Surface, type SurfaceAttributes } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { Text } from '$lib/typography';
	import { slide } from 'svelte/transition';

	let {
		align = 'flex-start',
		children,
		class: _class = '',
		color = 'neutral',
		gap = 'md',
		openned = $bindable(false),
		p = 'md',
		position = 'bottom-right',
		prefix,
		shape = 'rounded',
		showclose = true,
		size = 'md',
		title,
		variant = 'outlined',
		...rest
	}: SnackbarAttributes = $props();

	$effect(() => {
		// if (openned) {
		// 	setTimeout(() => {
		// 		openned = false;
		// 	}, 10000);
		// }
	});

	function click(e: MouseEvent) {
		e.stopPropagation();
	}

	function close() {
		openned = false;
	}
</script>

<Surface
	aria-label="Snackbar"
	class="WuiSnackbar WuiSnackbar--{position} {openned ? 'WuiSnackbar--visible' : ''} {_class}"
	fontsize={size}
	role="alertdialog"
	onclick={click}
	{align}
	{color}
	{gap}
	{shape}
	{p}
	{variant}
	{...rest}
>
	{#if typeof prefix === 'string'}
		<Icon {size}>{prefix}</Icon>
	{:else if prefix}
		{@render prefix()}
	{/if}

	<Col align="flex-start" justify="flex-start" gap="ss" width="100%">
		{#if title}
			<Text color="inherit" variant="heading" bold={false} {size}>
				{title}
			</Text>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</Col>

	{#if showclose}
		<Button
			class="WuiSnackbar__close-button"
			prefix="close"
			variant={variant === 'outlined' ? 'plain' : variant}
			onclick={close}
			{color}
			{size}
			{shape}
		/>
	{/if}
</Surface>
